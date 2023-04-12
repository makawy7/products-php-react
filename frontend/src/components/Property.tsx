interface PropertyProps {
  name: string;
  value: number | string;
  unit: string;
}

function Property({ name, value, unit }: PropertyProps) {
  return (
    <li>
      {name}: {value + " " + unit}
    </li>
  );
}

export default Property;
