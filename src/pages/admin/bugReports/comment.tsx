import React from "react";

type Props = {
  value: string;
  action: Function;
  report: { uid: string; key: string; read: boolean; solved: boolean };
};
const Comment: React.FC<Props> = (props): JSX.Element => {
  const [txt, setTxt] = React.useState<string>(props.value);

  const handleChange: Function = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setTxt(e.target.value);
  };

  return (
    <div>
      <textarea value={txt} onChange={(e) => handleChange(e)} />
      <button
        onClick={() =>
          props.action(
            props.report.uid,
            props.report.key,
            props.report.read,
            props.report.solved,
            txt
          )
        }
      >
        enviar
      </button>
    </div>
  );
};

export default Comment;
