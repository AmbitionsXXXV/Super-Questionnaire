import type { FC } from "react";
import { useState } from "react";
import styles from "../index.module.scss";
import { useTitle } from "ahooks";
import { QuestionCard } from "@/components/QuestionCard/QuestionCard";
import { Typography } from "antd";

const { Title } = Typography;

const Star: FC = () => {
  useTitle("我的问卷 - 星标问卷");

  return (
    <>
      <div>Star</div>
    </>
  );
};

export default Star;
