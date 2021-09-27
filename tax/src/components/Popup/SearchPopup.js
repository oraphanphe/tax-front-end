import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
// import { DropdownExamRegion, DropdownExamOrganizer, LocationTable } from "../shared";
import { useSelector, useDispatch } from "react-redux";
import { hideSearchPopup } from "../../redux/actions";
// import { getTaxrateNo } from "../../api/apiGetTaxrateNo";
// import { getProvinceCode } from "../../api/apiGetProvinceCode";
// import { getOrganizer } from "../../api/apiGetExamOrganizer";
// import { getExamLocationZone } from "../../api/apiGetConfig";
import { get } from "lodash";
import PropTypes from "prop-types";
import { getTaxrate } from "../../api/apiGetTaxrate";

export const SearchPopup = ({onChange}) => {
  // const [region, setRegion] = useState("");
  // const [regionName, setRegionName] = useState("");
  // const [provinceCode, setProvinceCode] = useState("");
  // const [provinceName, setProvinceName] = useState("");
  const [examTaxrateNo, setTaxrateNo] = useState("");
  // const [examOrganizerName, setExamOrganizerName] = useState("");

  // const examZoneResonse = getExamLocationZone();
  const dispatch = useDispatch();
  const { isShow, title, description, action } = useSelector(
    (state) => state.searchPopup
  );
  const handleAction = (e) => {
    //call back function
    dispatch(hideSearchPopup());
    onChange(e);
  };
  // const onClickProvinceButton = (e) => {
  //   setProvinceCode(get(e, "provinceCode", ""));
  //   fetchProvinceData(get(e, "provinceCode", ""));
  // };
  const onClickTaxrateButton = (e) => {
    setTaxrateNo(e);
    fetchTaxrate(e);
  };

  const toggle = () => dispatch(hideSearchPopup());

  // const fetchProvinceData = async (e) => {
  //   const response = await getProvinceCode(e);
  //   setRegion(get(response[0], "region", ""));
  //   setRegionName(
  //     get(
  //       examZoneResonse.filter(
  //         (zone) => zone.regionCode === get(response[0], "region", "")
  //       )[0],
  //       "regionName",
  //       ""
  //     )
  //   );
  //   setProvinceName(
  //     get(
  //       response.filter((zone) => zone.provinceCode === e)[0],
  //       "provinceName",
  //       ""
  //     )
  //   );
  // };
  const fetchTaxrate = async (e) => {
    const response = await getTaxrate(e);
    // setExamOrganizerName(get(response[0], "orgName", ""));
  };

  return (
    <Modal isOpen={isShow} size="lg">
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        {/* <DropdownExamRegion
          label="สนามสอบ"
          value={provinceCode}
          onClick={(e) => {
            onClickProvinceButton(e);
          }}
        />
        <DropdownExamOrganizer
          label="สถานที่สอบ"
          value={examOrganizerCode + examOrganizerName}
          onClick={(e) => {
            onClickExamOrganizerButton(e);
          }}
        /> */}
      </ModalBody>
      <ModalFooter>
          {/* <LocationTable onClick={handleAction}/> */}
      </ModalFooter>
    </Modal>
  );
};
SearchPopup.defaultProps = {
  onChange: () => {},
};
SearchPopup.propTypes = {
  onChange: PropTypes.func,
};