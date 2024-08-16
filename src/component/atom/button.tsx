type Props = {
  styling: string;
  label: string;
  cta: (val: string) => void;
};
function Button({ styling, cta, label }: Props) {
  return (
    <button className={styling} onClick={cta}>
      {label}
    </button>
  );
}

export default Button;
