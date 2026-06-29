"use client";
import "./SaveResultForm.css";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation } from "@apollo/client";
import TimeResult from "../TimeResult/TimeResult";
import {
  CreateResultDocument,
  ResultsDocument,
} from "@/src/__generated__/graphql";
import { useRouter } from "next/navigation";
import SimpleButton from "../SimpleButton/SimpleButton";
import { CardColors } from "@/src/ts/types";

interface Props {
  duration?: number | null;
  classNames?: string;
}

function SaveResultForm({ classNames, duration }: Props) {
  const [newResult, setNewResult] = useState(null);
  const router = useRouter();

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
            seconds: duration ?? 500,
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
    <AnimatePresence>
      <motion.div
        layout
        transition={{ duration: 0.5 }}
        initial={{ y: 500, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        className="SaveResultBox">
        <h1>
          {duration ? (
            <>
              <div className="flex font-thin items-center text-3xl">
                Final&nbsp;time:&nbsp;
                <strong>
                  <TimeResult
                    duration={duration}
                    classNames="purple font-bold"
                  />
                </strong>
              </div>
            </>
          ) : (
            "You found them all!"
          )}
        </h1>

        {duration && (
          <form className="ResultForm">
            <input
              name="username"
              className="placeholder:font-thin"
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
      </motion.div>
    </AnimatePresence>
  );
}

export default SaveResultForm;
