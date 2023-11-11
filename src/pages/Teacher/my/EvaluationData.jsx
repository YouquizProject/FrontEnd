import EvaluationManage from "./EvaluationManage";
import { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ChapIdFetchThunk } from "../../../store/chapIdSlice";
import { useDispatch, useSelector } from "react-redux";

export default function EvaluationData() {
  const { id } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lists, setLists] = useState(null);
    useEffect(() => {
      const Data = async () => {
      try {
        const response = await axios.get(
          `http://52.79.181.56:8080/teacher/${id}/evaluationstatus`
        );
          setLists(response.data.evaluation_status[0]);
        } catch (e) {
          console.log(e);
        }
      };
      Data();
    }, []);

  const columns = useMemo(
    () => {
      if (!lists) return []; // lists가 null일 때 빈 배열 반환

      return [
        {
          accessor: "number",
          Header: "번호",
        },
        {
          accessor: "chap_id",
          Header: "단계"
          },
        {
          accessor: "title",
          Header: "학습내용",
        },
        {
          accessor: "status",
          Header: "채점완료/정원",
          Cell: ({ value }) => (
            <span>
                <span style={{ color: value.split("/")[0] === value.split("/")[1] ? "green" : "red" }}>
                  {value.split("/")[0]}
                </span>
                /{value.split("/")[1]}
            </span>
          ),
        },
        {
          accessor: "btn",
          Header: "--------",
        }
      ];
    }, [lists]);

  const data = useMemo(
    () => {
      if (!lists) return []; // lists가 null일 때 빈 배열 반환
      console.log(lists);
      return  lists.map((list, index) => {
        const EvaluationData = {
          number: index + 1,
          chap_id: list.chap_id+"단계",
          title: list.youtube_title,
          status: list.complete_student + "/" + list.total_student, 
          btn:<button 
              onClick={() => {
                navigate(`/teacher/study/${list.chap_id}/quizmedia`);
                dispatch(ChapIdFetchThunk(list.chap_id));
                }
              }
              style={{ background: "none", padding: 0, cursor: "pointer",color: "black" }}
            >채점하기
          </button>,
        };
        return EvaluationData;
      });
    }, [lists]);
  return <EvaluationManage columns={columns} data={data} />;
}
