"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/client";
import TimeResult from "../TimeResult/TimeResult";
import {
  CreateResultDocument,
  ResultsDocument,
} from "@/src/__generated__/graphql";
import { useRouter } from "next/navigation";
import SimpleButton from "../SimpleButton/SimpleButton";
import { CardColors } from "@/src/ts/types";
import "./SaveResultForm.css";
import { PENALTY } from "@/src/utils/constants";

interface Props {
  hintCount: number;
  duration?: number | null;
  classNames?: string;
}

function SaveResultForm({ classNames, duration, hintCount }: Props) {
  const [newResult, setNewResult] = useState(null);
  const router = useRouter();
  const [totalTime, setTotalTime] = useState(0);
  useEffect(() => {
    duration && setTotalTime(duration + hintCount * PENALTY);
  }, [duration, hintCount]);

  const [createRecord] = useMutation(CreateResultDocument, {
    update(cache, { data }) {
      const existingData = cache.readQuery({ query: ResultsDocument });
      if (existingData && data?.createResult) {
        cache.writeQuery({
          query: ResultsDocument,
          data: {
            results: [data.createResult, ...existingData.results],
          },
        });
      }
    },
  });

  const [username, setUsername] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    username &&
      createRecord({
        variables: {
          data: {
            username,
            seconds: totalTime ?? 500,
          },
        },
        onCompleted: async (data: any) => {
          if (data?.createResult) {
            const timestamp = Date.now();
            setNewResult(data?.createResult);
            router.push(`/results?id=${data.createResult.id}&t=${timestamp}`);
          }
        },
        refetchQueries: [{ query: ResultsDocument }],
        awaitRefetchQueries: true,
      });
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.6, delay: 0.4, type: "tween" }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`SaveResultBox ${classNames}`}>
      <div className="h-fit flex flex-col items-center w-full">
        <div className="SaveResultBox__summary flex flex-col lg:px-4 uppercase text-center tracking-[0.02rem] leading-7 items-center text-[17px] lg:text-[20px]">
          {duration ? (
            <>
              <div className="mt-2" style={{ fontWeight: 400 }}>
                your result:
              </div>
              {/* <span className="flex" style={{fontWeight: 300}}>
                  &nbsp;(+&nbsp;{hintCount * PENALTY}&nbsp;penalty&nbsp;seconds)
                </span>
              </div> */}
              <div
                className="flex my-4 mb-8 py-6 text-shadow-md text-[80px] font-bold tracking-wider"
                style={{ fontWeight: 700 }}>
                <TimeResult duration={totalTime} />
              </div>
              <div className="flex" style={{ fontWeight: 600 }}>
                time played:&nbsp;
                <TimeResult duration={duration} />
              </div>

              <div style={{ fontWeight: 500 }}>
                hints&nbsp;needed:&nbsp;{hintCount}
              </div>
              <div className="mb-5" style={{ fontWeight: 300 }}>
                penalty:&nbsp;00:{hintCount * PENALTY}
              </div>
            </>
          ) : (
            <p>You found them all!</p>
          )}
        </div>
        {duration && (
          <form className="ResultForm" style={{ fontFamily: "Nata Sans" }}>
            <input
              name="username"
              className="lowercase"
              placeholder="Enter name to save your result"
              onChange={(e) => setUsername(e.target.value)}
            />
            <SimpleButton
              type="submit"
              classNames="submit-button"
              isDisabled={username.length < 3}
              onClick={handleSubmit}
              color={CardColors.Purple}
              label="Submit"
            />
          </form>
        )}
      </div>
    </motion.div>
  );
}

export default SaveResultForm;
