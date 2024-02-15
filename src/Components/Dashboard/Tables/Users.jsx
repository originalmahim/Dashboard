import DefaultLayout from "../DefaultLayout/DefaultLayout";

const packageData = [
          {
            name: 'Md. Masum Billa',
            email:'masum@billa.com',
            JoinedDate: `Jan 13,2023`,
            status: 'Member',
          },
          {
            name: 'Andalib',
            email:'admin@andalib.xyz',
            JoinedDate: `Jan 13,2023`,
            status: 'Admin',
          },
          {
            name: 'Tareq Aziz Mahim',
            email:'tareqazizmahim@gmail.com',
            JoinedDate: `Jan 13,2023`,
            status: 'CEO & FOUNDER',
          },
          {
            name: 'Mashnoon Fuad Zean',
            email:'tareqazizmahim@gmail.com',
            JoinedDate: `Jan 13,2023`,
            status: 'Member',
          },
          {
            name: 'Syeda Rehnoma Tarannom',
            email:'syedatarannom@gmail.com',
            JoinedDate: `Jan 13,2023`,
            status: 'Member',
          },
          {
            name: 'Nafsin Chowdhury Farin',
            email:'farinnafisa00@gmail.com',
            JoinedDate: `Jan 13,2023`,
            status: 'Member',
          },
        ];
        
        const Users = () => {
          return (
          <DefaultLayout>
          <div className="flex flex-col gap-10">
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Name
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        Email
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        Joined
                      </th>
                      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                        Role
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {packageData.map((packageItem, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {packageItem.name}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {packageItem.email}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {packageItem.JoinedDate}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                              packageItem.status === 'Admin'
                        ? 'bg-success text-success'
                        : packageItem.status === 'CEO & FOUNDER'
                        ? 'bg-danger text-danger'
                        : 'bg-blue-600 text-blue-600'
                            }`}
                          >
                            {packageItem.status}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                          {packageItem.status === 'Member' && <button className="hover:text-primary bg-pink-400 dark:bg-violet-400 rounded-md p-2 text-white text-sm">
                              Make Admin
                            </button> } 
                            
                          
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </DefaultLayout>
          );
        };
        
        export default Users;