import * as React from "react";
import { Icon } from "@iconify/react";
import AddModal from "./modals/AddModal";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { searchForPhotos, toggleAddModal } from "../store/actions";
import { debounce } from "lodash";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { addModalState } = useSelector((state: RootState) => state);

  const dispatch: any = useDispatch();
  const searchMethod = (value: string) => dispatch(searchForPhotos(value));

  const debouncedSearch = debounce(searchMethod, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <header className="flex sticky top-0 py-2 z-10 flex-wrap gap-4 justify-between w-full items-center font-noto-sans">
      
      <div className="w-full sm:w-[18.75rem] overflow-hidden relative flex gap-3 items-center justify-center h-[3.438rem]">
        <Icon
          icon="fa-solid:search"
          className="text-grey left-2 absolute ml-4 text-xl pointer-events-none"
        />

        <input
          type="text"
          id="input-group-1"
          className="font-medium border-grey border pl-16 h-full flex-grow focus:ring-blue-500 focus:border-blue-500  text-grey text-sm block w-full p-2.5"
          placeholder="Search Image"
          onChange={(e) => {
            handleSearch(e);
          }}
        />
      </div>

      <button
        onClick={() => dispatch(toggleAddModal())}
        className="bg-[#0ea5e9] cursor-pointer ml-auto text-sm font-bold w-full sm:w-[8.563rem] h-[3.438rem] shadow-buttonShadow text-white"
      >
        Add Image
      </button>
      {addModalState && <AddModal />}
    </header>
  );
};

export default Header;
