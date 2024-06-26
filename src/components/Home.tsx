/* eslint-disable @typescript-eslint/no-explicit-any */
import userSvg from "../assets/user.svg";
import successSvg from "../assets/winner.svg";
import { useStore } from "../store/store";
import { useMutateData } from "../hooks/useMutateData";
import { generateRandomQuestions } from "../helper/questions";
import { useState, useEffect } from "react";
// import { FaRegCircleCheck, FaRegCircle } from "react-icons/fa6";

const Home = () => {
  const {
    failed,
    setData,
    countryData,
    setQuestionCount,
    QuestionCount,
    setFailed,
  } = useStore<{
    failed: boolean;
    setData: any;
    QuestionCount: number;
    countryData: any;
    setQuestionCount: any;
    setFailed: any;
  }>((state: any) => ({
    failed: state.failed,
    setData: state.setData,
    QuestionCount: state.QuestionCount,
    countryData: state.countryData,
    setQuestionCount: state.setQuestionCount,
    setFailed: state.setFailed,
  }));
  const [buttonShow, setbuttonShow] = useState<boolean>(false);
  const { data, mutate } = useMutateData("allcountries");
  const QuizUrl = import.meta.env.VITE_APP_QUIZ_URL;
  const [userChoice, setUserChoice] = useState("");
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  useEffect(() => {
    mutate({
      url: `${QuizUrl}`,
      payload: {},
    });
    setUserChoice("");
    setShowAnswer(false);

    setData(generateRandomQuestions(data ? data.slice(0, 5) : []));
  }, [QuizUrl, data, mutate, setData]);
  // console.log(countryData?.[QuestionCount].answer);
  // console.log(showAnswer);

  useEffect(() => {
    userChoice !== countryData?.[QuestionCount]?.answer
      ? setFailed()
      : setQuestionCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAnswer]);

  return (
    <section className="text-white text-2xl flex flex-col justify-center items-center my-[8vh]  mx-8  lg:h-full">
      <div className="relative lg:w-1/3 md:w-2/3 w-full  lg:mb-0 ">
        <h1 className="text-3xl font-bold py-3">Country Quiz</h1>
        {!failed && (
          <img
            src={userSvg}
            alt="svg"
            className="absolute top-0 right-0 h-auto w-[7rem]"
          />
        )}

        <div className=" p-4 bg-white rounded-3xl ">
          {!failed ? (
            <div>
              {" "}
              <p className="text-[#2F527B] font-bold text-2xl mt-4 text-pretty ">
                {countryData && countryData[QuestionCount]?.question}
              </p>
              <div className="flex flex-col gap-3 mt-6">
                {countryData &&
                  countryData[QuestionCount]?.options.map(
                    (val: string, index: number) => (
                      // missed #EA8282
                      //correct #60BF88
                      <div
                        className={`p-4 border-[#6066D0B2] text-[#6066D0CC] rounded-xl border-2 gap-y-2 cursor-pointer flex gap-2 items-center ${
                          userChoice === val && !showAnswer
                            ? "bg-[#F9A826] text-white border-[#f9a826]"
                            : ""
                        } 
                            ${
                              userChoice !== val && !showAnswer
                                ? "hover:bg-[#F9A826] hover:border-2 hover:border-[#F9A826] hover:text-white hover:cursor-pointer"
                                : ""
                            }
                            ${
                              showAnswer &&
                              val === countryData[QuestionCount].answer
                                ? "bg-[#60BF88] border-[#60BF88] text-white border-2 hover:bg-[#60BF88] hover:border-[#60BF88]"
                                : ""
                            } 
                            ${
                              showAnswer &&
                              userChoice ===
                                countryData[QuestionCount].answer &&
                              val === userChoice
                                ? "bg-[#60BF88] border-[#60BF88] text-white border-2 hover:bg-[#60BF88] hover:border-[#60BF88] hover:text-white"
                                : "hover:cursor-not-allowed"
                            } 
                             ${
                               showAnswer &&
                               userChoice !==
                                 countryData[QuestionCount].answer &&
                               val === userChoice
                                 ? "bg-[#EA8282] border-[#EA8282] text-white border-2 hover:bg-[#EA8282] hover:border-[#EA8282] hover:text-white"
                                 : "hover:cursor-not-allowed"
                             } 
                                 
                                 
                             `}
                        key={index}
                        onClick={() => {
                          setUserChoice(`${showAnswer ? "" : val}`);
                          userChoice !== ""
                            ? setbuttonShow(true)
                            : setbuttonShow(false);
                        }}
                      >
                        <div className="text-pretty mx-2 flex gap-2">
                          {countryData?.[QuestionCount].type === "flag" ? (
                            <>
                              {String.fromCharCode(65 + index)}. &nbsp; &nbsp;
                              <img
                                src={val}
                                alt="Flag"
                                className="h-8 w-12 inline-block mr-2"
                              />
                            </>
                          ) : (
                            <>
                              {String.fromCharCode(65 + index)}. {val}
                            </>
                          )}
                        </div>
                      </div>
                    )
                  )}

                {buttonShow && (
                  <div className="flex flex-end justify-end items-end">
                    <div
                      className="bg-[#F9A826] rounded-xl px-4 py-3 w-fit text-lg cursor-pointer"
                      onClick={() => {
                        // ;

                        userChoice !== "" ? setShowAnswer(true) : "";
                      }}
                    >
                      Next
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center ">
              <img src={successSvg} alt="svg" className="w-auto h-auto py-4 " />
              <p className="text-[#1D355D] font-bold text-[48px] py-4">
                Result
              </p>
              <p className="text-lg font-normal text-[#1D355D] py-4">
                you got{" "}
                <span className="font-bold text-xl text-emerald-600">
                  {" "}
                  {QuestionCount}
                </span>{" "}
                correct answers{" "}
              </p>

              <div className="flex flex-col justify-center items-center text-center mt-8">
                <div
                  className=" rounded-xl p-2 px-12 flex  text-lg cursor-pointer border-[#1D355D] text-[#1D355D] border-2"
                  onClick={() => {
                    // setbuttonShow(showAnswer ? true : false);
                    setQuestionCount(0);
                    setUserChoice("");
                    setFailed();
                  }}
                >
                  Try again
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
