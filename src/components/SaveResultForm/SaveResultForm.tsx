"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MutationResult, useMutation } from "@apollo/client";
import TimeResult from "../TimeResult/TimeResult";
import {
  CreateResultDocument,
  CreateResultMutation,
  GetTopPageResultsDocument,
} from "@/src/__generated__/types";
import { useRouter, useSearchParams } from "next/navigation";
import SimpleButton from "../SimpleButton/SimpleButton";
import { Colors } from "@/src/ts/types";
import "./SaveResultForm.css";
import { PENALTY } from "@/src/utils/constants";
import { Field, Formik } from "formik";

interface Props {
  hintCount: number;
  gameId: string;
  seed?: number;
  duration?: number | null;
  classNames?: string;
}

interface SaveResultFormValues {
  username: string;
}

function SaveResultForm({
  classNames,
  gameId,
  duration = 3,
  hintCount,
}: Props) {
  const router = useRouter();
  const [totalTime, setTotalTime] = useState(0);
  useEffect(() => {
    duration && setTotalTime(duration + hintCount * PENALTY);
    duration && console.log("duration");
  }, [duration, hintCount]);

  const [createRecord] = useMutation(CreateResultDocument);

  const submit = (values: SaveResultFormValues) => {
    const { username } = values;
    const timestamp = Date.now().toString();
    values.username &&
      createRecord({
        variables: {
          data: {
            username,
            seconds: totalTime ?? 0,
            game: { connect: { id: gameId } },
            hintCount,
          },
        },
        onCompleted: async (
          data: MutationResult<CreateResultMutation>["data"],
        ) => {
          if (data?.createResult) {
            router.push(`/results?id=${data.createResult.id}&t=${timestamp}`);
          }
        },
        refetchQueries: [{ query: GetTopPageResultsDocument }],
        awaitRefetchQueries: true,
      });
  };
  const penaltySeconds = hintCount * PENALTY;
  return (
    <motion.div
      layout
      transition={{ duration: 0.6, delay: 0.4, type: "tween" }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`SaveResultBox ${classNames}`}>
      <div className="h-fit flex flex-col items-center w-full">
        <div className="SaveResultBox__summary  flex flex-col lg:px-4 uppercase text-center tracking-[0.02rem] leading-7 items-center text-[17px] lg:text-[20px] mb-22">
          {duration ? (
            <>
              <div className="mt-2" style={{ fontWeight: 400 }}>
                your result:
              </div>
              <span className="flex" style={{fontWeight: 300}}>
                  &nbsp;(+&nbsp;{hintCount * PENALTY}&nbsp;penalty&nbsp;seconds)
                </span>
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
              {penaltySeconds > 0 && (
                <div className="flex" style={{ fontWeight: 300 }}>
                  time added:&nbsp;
                  <TimeResult duration={penaltySeconds} />
                </div>
              )}
            </>
          ) : (
            <p>You found them all!</p>
          )}
        </div>
        {duration && (
          <Formik initialValues={{ username: "" }} onSubmit={submit}>
            {({ values, handleChange, setStatus, status, handleSubmit }) => (
              <form
                className="ResultForm"
                style={{ fontFamily: "Nata Sans" }}
                onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  {" "}
                  <Field
                    name="username"
                    className="lowercase"
                    placeholder="Enter name to save your result"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      console.log("eee", e);
                      if (e.target.value.length > 10) {
                        setStatus("max");
                      } else if (status === "max") {
                        setStatus("");
                      }
                      handleChange(e);
                    }}
                  />
                  {status === "max" && (
                    <span className="text-sm mt-[-1.4rem] text-center text-red-800/60">
                      Usernames can't be longer than 10 characters.
                    </span>
                  )}
                </div>
                <SimpleButton
                  type="submit"
                  classNames="submit-button"
                  isDisabled={
                    values.username.length < 3 || values.username.length > 10
                  }
                  onClick={handleSubmit}
                  color={Colors.Purple}
                  label="Submit"
                />
              </form>
            )}
          </Formik>
        )}
      </div>
    </motion.div>
  );
}

export default SaveResultForm;
