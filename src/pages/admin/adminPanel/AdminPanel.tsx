import React from "react";
import { useSelector } from "react-redux";

type Request = {
  business: string;
  cardSended: boolean;
  comuna: string;
  date: Date;
  email: string;
  key: string;
  location: string;
  quantity: number;
  region: string;
  responseComment: string;
  solved: boolean;
  starting: boolean;
  title: string;
  uid: string;
  paid: boolean;
};

const AdminPanel: React.FC = (): JSX.Element => {
  const requests: Request[] = useSelector(
    (selector: any) => selector.admin.requests
  );

  return (
    <div>
      <h1>admin panel</h1>
      <p>{JSON.stringify(requests)}</p>
    </div>
  );
};

export default AdminPanel;
