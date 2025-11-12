import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { decrement, increment, selectCount } from "../../app/vehicleReducer/vehicleSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  return (
    <div>
      Dashboard
      <button onClick={() => dispatch(increment())}>Increment</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Dashboard;
