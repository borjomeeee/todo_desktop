import React, { useEffect, useState } from "react";
import { LOADING } from "../enums";

// ICONS
import { CloseIcon, CheckIcon } from "../utils/icons";

// PROGRESS BAR
import Spinner from "react-bootstrap/Spinner";

type ICommonLoadingBar = {
  loading: LOADING;
};

type ICommonLoadingBarData = {
  className: string;
  text: string;
  icon: React.ReactElement;
};

const CommonLoadingBar: React.FC<ICommonLoadingBar> = ({ loading }) => {
  const [loadingData, setLoadingData] = useState<ICommonLoadingBarData>(
    getLoadingDataByStatus(loading)
  );

  useEffect(() => {
    setLoadingData(getLoadingDataByStatus(loading));

    if (
      loading !== LOADING.LOADING_PROCESS &&
      loading !== LOADING.LOADING_STAY
    ) {
      setTimeout(
        () => setLoadingData(getLoadingDataByStatus(LOADING.LOADING_STAY)),
        2000
      );
    }
  }, [loading]);

  return (
    <div className={`loading ${loadingData.className}`}>
      <div className="loading__icon">{loadingData.icon}</div>

      <div className="loading__text">{loadingData.text}</div>
    </div>
  );
};

export const getLoadingDataByStatus = (
  status: LOADING
): ICommonLoadingBarData => {
  switch (status) {
    case LOADING.LOADING_PROCESS:
      return {
        className: "loading-process",
        text: "Загрузка ...",
        icon: <Spinner animation="border" variant="light" size="sm" />
      };
    case LOADING.LOADING_SUCCESS:
      return {
        className: "loading-success",
        text: "Загрузка прошла успешно!",
        icon: <CheckIcon width={15} height={15} fill={"#FFFFFF"} />
      };
    case LOADING.LOADING_FAILED:
      return {
        className: "loading-failed",
        text: "Ошибка! Попробуйте снова ...",
        icon: <CloseIcon width={15} height={15} fill={"#FFFFFF"} />
      };
    default:
      return {
        className: "loading-stay",
        text: "",
        icon: <></>
      };
  }
};

export default CommonLoadingBar;
