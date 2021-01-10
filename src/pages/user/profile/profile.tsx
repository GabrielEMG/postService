import React from "react";
import { useSelector } from "react-redux";
import { firebase } from "../../../firebase";
import ChangeInput from "../../../components/changeInput";
import { Container, Row } from "react-bootstrap";

type User = {
  email: string;
  uid: string;
  name: string;
  business: string;
  region: string;
  comuna: string;
  location: string;
  surveyCount: number;
  surveyCap: number;
  emailConfirmed: boolean;
};

const initialStateProfile: User = {
  email: "",
  uid: "",
  name: "",
  business: "",
  region: "",
  comuna: "",
  location: "",
  surveyCount: 0,
  surveyCap: 0,
  emailConfirmed: false,
};

const Profile: React.FC = (): JSX.Element => {
  const [userProfile, setUserProfile] = React.useState<User>(
    initialStateProfile
  );
  const user = useSelector((selector: any): User => selector.user);

  React.useEffect(() => {
    setUserProfile({ ...user });
  }, [user]);

  const saveChanges: Function = async (
    key: string,
    value: string
  ): Promise<void> => {
    try {
      setUserProfile((prev) => ({ ...prev, [key]: value }));
      firebase
        .database()
        .ref(`user/${user.uid}`)
        .update({ [key]: value });
    } catch (err) {
      alert("un error ocurrió al actualizar usuario");
      console.log(err.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center my-4">
        <h4>Perfil de usuario</h4>
      </Row>
      <Row>
        <ChangeInput
          title="Email"
          name="email"
          value={userProfile.email}
          action={saveChanges}
          canChange={false}
        />
        <ChangeInput
          title="Código de usuario"
          name="uid"
          value={userProfile.uid}
          action={saveChanges}
          canChange={false}
        />
        <ChangeInput
          title="Nombre de usuario"
          name="name"
          value={userProfile.name}
          action={saveChanges}
          canChange={true}
        />
        <ChangeInput
          title="Nombre de empresa"
          name="business"
          value={userProfile.business}
          action={saveChanges}
          canChange={true}
        />
        <ChangeInput
          title="Región"
          name="region"
          value={userProfile.region}
          action={saveChanges}
          canChange={true}
        />
        <ChangeInput
          title="Comuna"
          name="comuna"
          value={userProfile.comuna}
          action={saveChanges}
          canChange={true}
        />
        <ChangeInput
          title="Dirección"
          name="location"
          value={userProfile.location}
          action={saveChanges}
          canChange={true}
        />
      </Row>
    </Container>
  );
};

export default Profile;
