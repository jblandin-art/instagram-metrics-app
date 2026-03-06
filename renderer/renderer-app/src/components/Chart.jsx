import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import Footer from "./Footer";
import BottomSection from "./BottomSection";

function Chart({
  followers,
  following,
  getNonFollowingBack,
  getImNonFollowingBack,
  containerRef,
  copyToClipboard,
  exportAsCSV,
  copied
}) {

  const notFollowingBack = getNonFollowingBack();
  const mutuals = followers.length - getImNonFollowingBack().length;

  // Prepare data for the bar chart
  const chartData = [
    { name: "Followers", Value: followers.length },
    { name: "Following", Value: following.length },
    { name: "Not Following Back", Value: notFollowingBack.length },
    { name: "Mutuals", Value: mutuals }
  ];

  return (
    <>
      <div className="top-section">
        <div style={{ width: "100%", height: "100%" }}>
          <h2 style={{ marginLeft: "20px" }}>Connection Overview</h2>
          <img className="line-break" src="../line.png" alt="line break"/>
          <ResponsiveContainer width="100%" height="72%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="name"
                stroke="#ffaa32"
                tick={{ fill: "#dfdcd8", fontSize: 14 }}
              />
              <YAxis
                stroke="#ffaa32"
                tick={{ fill: "#dfdcd8", fontSize: 14 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "2px solid #bc7e28",
                  color: "#ffaa32"
                }}
              />
              <Legend
                wrapperStyle={{ color: "#dfdcd8", fontSize: "14px" }}
              />
              <Bar dataKey="Value" fill="#ffaa32" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <BottomSection 
        copyToClipboard={copyToClipboard}
        exportAsCSV={exportAsCSV}
        getNonFollowingBack={getNonFollowingBack}
        containerRef={containerRef}
        copied={copied}
        />

      <Footer />
    </>
  );
}

export default Chart;