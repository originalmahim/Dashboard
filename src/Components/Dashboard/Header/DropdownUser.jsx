import  { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

 import UserOne from './../DashImage/user/user-01.png';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            Tareq Aziz Mahim
          </span>
          <span className="block text-xs text-black dark:text-white">CEO & FOUNDER</span>
        </span>

        <span className="h-12 w-12 btn rounded-full">
          <img src={UserOne} alt="User" />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                  fill=""
                />
                <path
                  d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                  fill=""
                />
              </svg>
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.8656 8.86874C20.5219 8.53124 20.0781 8.40062 19.6344 8.40062H17.6781C17.6156 7.86562 17.4344 7.36562 17.1562 6.91249L18.5344 5.55624C18.7594 5.33124 18.7969 5.00312 18.6156 4.74062L16.3656 1.07562C16.1781 0.803746 15.8219 0.648746 15.4906 0.675621C14.1094 0.803746 12.7781 0.956246 11.3969 1.11562C11.1094 1.11562 10.8656 1.34625 10.8656 1.67562V4.07562C9.4656 4.26562 8.1281 4.40312 6.7281 4.57562L5.8031 1.07187C5.77187 0.831246 5.50625 0.668746 5.26562 0.700621L1.88437 1.19687C1.61562 1.22875 1.39062 1.46875 1.41875 1.74687L2.47812 6.65312C2.47812 6.70312 2.50312 6.75937 2.5125 6.80937L3.03125 10.6469C2.70312 11.0781 2.42812 11.5562 2.25312 12.0562L0.506248 13.5344C0.353123 13.9125 0.509373 14.3719 0.881248 14.525L5.7625 16.4406C5.83125 16.4625 5.90312 16.4719 5.97187 16.4969C5.9973 16.5046 6.02153 16.5293 6.0375 16.5562L6.67187 17.3625C6.70937 17.4094 6.75 17.4406 6.80312 17.4625L10.3406 18.9656C10.5562 19.0406 10.8094 18.9594 10.9344 18.7594L11.0844 18.5344C11.2062 18.3312 11.5094 18.3037 11.6781 18.4781L12.9031 19.5344C12.9375 19.5562 12.9781 19.5656 13.0094 19.5719C13.4031 19.6406 13.8094 19.6844 14.2094 19.6844C14.6562 19.6844 15.0656 19.6406 15.4625 19.5656C15.4906 19.5656 15.5156 19.5375 15.5344 19.5256L17.7594 18.4719C17.8906 18.3844 18.1531 18.4312 18.2312 18.5562L19.6375 20.0906C19.7406 20.2406 19.9406 20.2781 20.0906 20.1756L20.5844 19.8406C20.7344 19.7406 20.7719 19.5406 20.6719 19.3906L19.2281 17.8469C19.3781 17.6256 19.3844 17.3312 19.2469 17.1219L18.0812 14.7437C18.1062 14.7256 18.1281 14.7094 18.1531 14.6937L20.4094 12.2256C20.7969 11.8787 20.9281 11.2406 20.7406 10.6875L19.3125 7.27874C19.2906 7.22874 19.2469 7.18499 19.2094 7.14374L17.8687 5.25C17.8844 5.22874 17.8969 5.20624 17.9125 5.19062L20.8656 8.86874ZM11.2094 17.3094C10.3719 17.3094 9.67187 16.6094 9.67187 15.7719C9.67187 14.9344 10.3719 14.2344 11.2094 14.2344C12.0469 14.2344 12.7469 14.9344 12.7469 15.7719C12.7469 16.6094 12.0469 17.3094 11.2094 17.3094Z"
                  fill=""
                />
              </svg>
              Settings
            </Link>
          </li>
        </ul>
        <div className="flex justify-center py-5 border-t border-stroke dark:border-strokedark">
          <Link
            to="/logout"
            className="text-xs font-semibold duration-300 ease-in-out hover:text-primary lg:text-sm"
          >
            Sign out
          </Link>
        </div>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
