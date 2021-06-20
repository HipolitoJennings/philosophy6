import React from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "@apollo/client";
import { getBlogDetail } from "@/apis";
import get from "lodash/get";

import { Spin } from "@/components";
import "./index.scss";

interface IArticleProps {
  match: any;
}

function Article(props: IArticleProps) {
  const issueId = props?.match?.params?.id;

  const { loading, data } = useQuery(getBlogDetail(issueId));

  const issue1 = get(data, "viewer.repository.issue1") || {};
  const { title, createdAt, body } = issue1;
  return loading ? (
    <Spin />
  ) : (
    <div className="article">
      <h1>{title}</h1>
      <h4 style={{ color: "#ccc" }}>{createdAt?.split("T")[0]}</h4>
      <ReactMarkdown>{body ? body : "编写中..📚"}</ReactMarkdown>
    </div>
  );
}
export default Article;
