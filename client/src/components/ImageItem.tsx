import * as React from "react";
import { useDispatch } from "react-redux";
import { setImageId } from "../store/actions";

interface IImageItemProps {
  imageUrl: string;
  id: string;
  label: string;
}

const ImageItem: React.FunctionComponent<IImageItemProps> = ({
  imageUrl,
  label,
  id,
}) => {
  const dispatch: any = useDispatch();
  return (
    <div className="font-montserrat mb-4 mt-0 sm:mb-8 w-full h-full relative cursor-pointer overflow-hidden group min-w-0 break-inside-avoid">
      <img
        className="w-full h-full object-cover"
        src={imageUrl}
        alt={label}
      />
      <div className="absolute p-6 flex flex-col justify-between top-0 left-0 w-full h-full bg-overlay transition-all scale-0 group-hover:scale-100 ease-in-out duration-200 delay-100">
        <button
          className="self-end w-[3.938rem] bg-red border border-red h-6 text-center text-white text-[0.825rem]"
          onClick={() => dispatch(setImageId(id))}
        >
          delete
        </button>
        <p className="text-white text-lg capitalize">{label}</p>
      </div>
    </div>
  );
};

export default ImageItem;
