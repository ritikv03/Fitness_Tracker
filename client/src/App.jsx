import "bootstrap/dist/css/bootstrap.min.css"
import Signup from './SignUp'
import {BrowserRouter ,Routes ,Route} from 'react-router-dom'
import Login from './Login'
import Homepage from './homepage'
import DietInfo from "../components/DietInfo/DietInfo"
import Dashboard from "../components/Dashboard/Dashboard"
import MealPlan from "../components/MealPlan/MealPlan"
import BMI from "../components/BMI/BMI"
import Account from "../components/Account/Account"
import Notes from "../components/Notes/Notes"
import WaterConsumption from "../components/WaterConsumption/WaterConsumption"
import Exercise from "../components/Exercise/Exercise"
import Workout from "../components/Workout/Workout"
import Chest from "../components/Workout/Chest"
import Back from "../components/Workout/Back"
import Shoulder from "../components/Workout/Shoulder"
import Arms from "../components/Workout/Arms"
import Abs from "../components/Workout/Abs"
import Legs from "../components/Workout/Legs"

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Homepage/>}></Route>
        <Route path='/dietinfo' element={<DietInfo/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/mealplan' element={<MealPlan/>}></Route>
        <Route path='/bmi' element={<BMI/>}></Route>
        <Route path='/account' element={<Account/>}></Route>
        <Route path='/notes'element={<Notes/>}></Route>
        <Route path='/water'element={<WaterConsumption/>}></Route>
        <Route path='/exercise'element={<Exercise/>}></Route>
        <Route path='/workout'element={<Workout/>}></Route>
        <Route path='/chest'element={<Chest/>}></Route>
        <Route path='/back'element={<Back/>}></Route>
        <Route path='/shoulders'element={<Shoulder/>}></Route>
        <Route path='/arms'element={<Arms/>}></Route>
        <Route path='/abs'element={<Abs/>}></Route>
        <Route path='/legs'element={<Legs/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App
