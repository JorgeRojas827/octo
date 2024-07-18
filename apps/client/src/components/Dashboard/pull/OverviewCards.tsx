const OverviewCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-2 rounded-md border space-y-2">
        <h5 className="text-base text-center font-bold">Total Pull Request</h5>
        <p className="text-4xl font-bold text-center">120</p>
      </div>
      <div className="p-2 rounded-md border space-y-2">
        <h5 className="text-base text-center font-bold">Pull Request Open</h5>
        <p className="text-4xl font-bold text-center text-green-500">43</p>
      </div>
      <div className="p-2 rounded-md border space-y-2">
        <h5 className="text-base text-center font-bold">Pull Request Closed</h5>
        <p className="text-4xl font-bold text-center text-red-500">32</p>
      </div>
      <div className="p-2 rounded-md border space-y-2">
        <h5 className="text-base text-center font-bold">Pull Request Merged</h5>
        <p className="text-4xl font-bold text-center text-primary">12</p>
      </div>
    </div>
  );
};

export default OverviewCards;
