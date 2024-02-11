
import Orders from '../Tables/Orders';
import DefaultLayout from './../DefaultLayout/DefaultLayout';


const Tables = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
       <Orders></Orders>
      </div>
    </DefaultLayout>
  );
};

export default Tables;
