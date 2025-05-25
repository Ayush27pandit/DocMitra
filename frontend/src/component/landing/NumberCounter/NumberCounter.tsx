import CountUp from "react-countup";
export default function NumberCounterStrip() {
  return (
    <div className="bg-secondary-200 text-white py-6 font-inter opacity-90">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <CountUp
            end={12000}
            duration={2}
            className="text-md md:text-2xl font-bold"
            enableScrollSpy
            scrollSpyOnce
            suffix="+"
          />
          <p>Documents Created</p>
        </div>
        <div>
          <CountUp
            end={8000}
            duration={2}
            className="text-md md:text-2xl font-bold"
            enableScrollSpy
            scrollSpyOnce
            suffix="+"
          />
          <p>Active Users</p>
        </div>
        <div>
          <CountUp
            end={150}
            duration={3}
            className="text-md md:text-2xl font-bold"
            enableScrollSpy
            scrollSpyOnce
            suffix="+"
          />
          <p>Templates Available</p>
        </div>
        <div>
          <CountUp
            end={10000}
            duration={2}
            className="text-md md:text-2xl font-bold"
            enableScrollSpy
            scrollSpyOnce
            suffix="+"
          />
          <p>Downloads Completed</p>
        </div>
      </div>
    </div>
  );
}
