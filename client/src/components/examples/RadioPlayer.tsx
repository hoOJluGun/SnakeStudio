import RadioPlayer from "../RadioPlayer";

export default function RadioPlayerExample() {
  return (
    <div className="h-96">
      <RadioPlayer onStationChange={(station) => console.log("Station:", station.name)} />
    </div>
  );
}
