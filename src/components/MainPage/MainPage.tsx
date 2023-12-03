import { useAppSelector } from "../../hooks/hooks";
import Card from "../Card/Card";


function MainPage() {
const formData = useAppSelector((state) => state.formData.formData)
console.log('mainFormData', formData);
  return (
    <div>
      {formData.map((el, key) => (
        <Card isLast={key===formData.length - 1} card={el} key={key}/>
      ))}
    </div>
  );
}

export default MainPage;
