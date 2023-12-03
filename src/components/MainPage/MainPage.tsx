import { useAppSelector } from "../../hooks/hooks";
import Card from "../Card/Card";


function MainPage() {
const formData = useAppSelector((state) => state.formData.formData)
console.log('mainFormData', formData);
  return (
    <div>
      {formData.map((el, key) => (
        <Card card={el} key={key}/>
      ))}
    </div>
  );
}

export default MainPage;
