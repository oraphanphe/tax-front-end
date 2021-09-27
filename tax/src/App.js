import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import TaxCatalogPage from "./pages/TaxCatalog/TaxCatalog";
import TaxCatalogDetailPage from "./pages/TaxCatalog/TaxCatalogDetail";
import TaxRateDetailPage from "./pages/TaxRateDetail/TaxRateDetail";
import TaxRateDetailMaintainPage from "./pages/TaxRateDetail/TaxRateDetailMaintain";
import PersonInfoPage from "./pages/PersonInfo/PersonInfo";
import TaxPersonInfoPage from "./pages/TaxPersonInfo/TaxPersonInfo";
import "./App.css";
//import {Spinner, Popup} from "./components/shared";

const App = () => {
  return (
    <BrowserRouter>
     
     
      <Switch>

      
         <Route path="/taxCatalog" render={(props) => <TaxCatalogPage {...props} />} /> 
         <Route path="/taxCatalogDetail" render={(props) => <TaxCatalogDetailPage {...props} />} /> 
         <Route path="/taxRateDetail" render={(props) => <TaxRateDetailPage {...props} />} /> 
         <Route path="/taxRateDetailMaintain" render={(props) => <TaxRateDetailMaintainPage {...props} />} /> 
         <Route path="/personinfo" render={(props) => <PersonInfoPage {...props} />} /> 
         <Route path="/taxPersonInfo" render={(props) => <TaxPersonInfoPage {...props} />} /> 
        <Redirect from="*" to="/personinfo" /> 
      </Switch>
    </BrowserRouter>
  );
};

export default App;





// import React from "react";
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// //import LoginPage from "./pages/Login/Login.searchURL";
// //import ExamRoundPage from "./pages/ExamRound/ExamRound";
// //  import HomePage from "./pages/Home/Home";
//   import CovidPage from "./pages/Covid/Covid";
// //  import UserPage from "./pages/User/User";
// //  import UserDetailPage from "./pages/User/UserDetail";
// import "./App.css";
// import {Spinner, Popup} from "./components/shared";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Spinner />
//       <Popup />
//       <Switch>
        
//       <Route path="/covid" render={(props) => <CovidPage {...props} />} /> 
       
//         { <Redirect from="*" to="/covid" /> }


//       </Switch>
//     </BrowserRouter>
//   );
// };

// export default App;






// import Header from './components/Header/Header'

// function App() {
//   return (
//     <div className="App">
//         <Header />
//     </div>
//   );
// }

// export default App;




//---------------------------HAVE SIDEBAR----------------------------
// import ExamRoundPage from "./pages/ExamRound/ExamRound";
// import './App.css';
// import Sidebar from './components/Sidebar/Sidebar';

// import Overview from './pages/License/Overview';
// import { Setting, ExamRound, ExamOrganier, ExamRegion, ExamLocation,  ExamSchedule} from './pages/License/Setting';
// // import Team from './pages/License/Team';
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// function App() {
//   return (
//     <BrowserRouter>
//       <Sidebar />
//       <Switch>
//         <Route path='/overview' exact component={Overview} />
//         <Route path='/setting' exact component={Setting} />
//         <Route path='/setting/examRound' exact component={ExamRound} />
//         <Route path='/setting/examOrganier' exact component={ExamOrganier} />
//         <Route path='/setting/examRegion' exact component={ExamRegion} />
//         <Route path='/setting/examLocation' exact component={ExamLocation} />
//         <Route path='/setting/examSchedule' exact component={ExamSchedule} />
  
//       </Switch>
//     </BrowserRouter>
//   );
// }

// export default App;





// import React from 'react';
// // import logo from './logo.svg';
// import './App.css';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import ListExamroundComponent from './components/ListUserComponent';
// import HeaderComponent from './components/HeaderComponent';
// import FooterComponent from './components/FooterComponent';
// import CreateExamroundComponent from './components/CreateExamroundComponent';
// import ViewExamroundComponent from './components/ViewExamroundComponent';

// function App() {
//   return (
//     <div>
//         <Router>
//               <HeaderComponent />
//                 <div className="container">
//                     <Switch> 
//                           <Route path = "/" exact component = {ListExamroundComponent}></Route>
//                           <Route path = "/employees" component = {ListExamroundComponent}></Route>
//                           <Route path = "/add-employee/:id" component = {CreateExamroundComponent}></Route>
//                           <Route path = "/view-employee/:id" component = {ViewExamroundComponent}></Route>
//                           {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
//                     </Switch>
//                 </div>
//               <FooterComponent />
//         </Router>
//     </div>
    
//   );
// }

// export default App;



