import React, { useEffect, useState } from "react";
import {Button } from "reactstrap";
import styles from "../../components/TaxStyle/TaxStlye.module.css";
import {Container,Wrapper,} from "../../components/shared";
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import apiSpring from "../../api/apiSpring";

  const TaxRateDetail = (props) => {
  const [result, setResult] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
    useEffect(() => {
      fetchData();
    }, []);
    
//----------------------------for SearchAll spring boot------------------------
    const fetchData = async () => {
 
    let formData = new FormData();    //formdata object
    formData.append('type', 'A');   //append the values with key, value pair
    const config = { headers: { 'content-type': 'application/json' }}

    try
    {
      const { status, data } = await apiSpring.post("/taxRateDetail/search",formData,config);
      if (status === 200) {
        setResult(data); //เมื่อ setResult แล้ว ค่า result จะได้เป็นค่า arraylist ของ data สามารถนำค่า resultมาใช้ได้เลย เช่น result[0] คือ arrayตัวที่0
        console.log("result in fetchData spring >>>>>>>>>>>>>.. ",data);
      } else {
        alert("พบข้อผิดพลาดในการค้นหาข้อมูล! status ",status);
      }
    }
    catch (err) 
    {  
      alert("พบข้อผิดพลาดในการค้นหาข้อมูล! err ",err);
    }
  };

  const taxRateDetailPush= () => {
    history.push("/taxRateDetail");
  }
  const taxrateDetail = (taxRateDetail) => {
    console.log('result:'+taxRateDetail+':result');
      history.push("/taxrateDetailMaintain", taxRateDetail);
  }
 
 const renderTaxRateDetail = (taxRateDetail, index) => {
  console.log('renderTaxRateDetail index :'+index+':result');
  console.log('renderTaxRateDetail size :'+taxRateDetail.size+':taxRateDetail');
    return (
     
      <tr className={styles.title} key={index}>
        <td>{taxRateDetail.taxRateDetailGroup.rateNo}</td>
        <td>{taxRateDetail.minAmt}</td>
        <td>{taxRateDetail.maxAmt}</td>
        <td>{taxRateDetail.rate}</td>
        <td>{taxRateDetail.amount}</td>
        <td>{taxRateDetail.taxAmt}</td>
        <td>{taxRateDetail.taxSum}</td>
        <td className={styles.operation}>
          <button
            className={styles.buttonEdit}
            onClick={() => taxrateDetail(taxRateDetail)}
          >
            view
          </button>
        </td>
      </tr>
    );
  };
  return (
    <Container>
      <Wrapper>
        <br></br>
        <h2 className={styles.title}>กำหนดตารางอัตราภาษี</h2>
        
        <div className={styles.flexend}>
          <tr>
          <td>
          <Button color="primary" type="button" onClick={() => taxrateDetail(null)}>
               Add
            </Button>
  
            &nbsp;
          </td>
          </tr>
        </div>
        <br></br>
        <MDBTable striped bordered scrollY hover size="sm">
          <MDBTableHead>
            <tr className={styles.head}>
              <th>ขั้นเงินได้</th>
              <th>จำนวนเงินได้ต่ำสุด</th>
              <th>จำนวนเงินได้สูงสุด</th>
              <th>อัตราภาษี(%)</th>
              <th>จำนวนเงิน</th>
              <th>ภาษีในแต่ละชั้น</th>
              <th>ภาษีสะสมสูงสุด</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>{result.map(renderTaxRateDetail)}</MDBTableBody>
        </MDBTable>
      </Wrapper>
    </Container>
  );
};

export default TaxRateDetail;