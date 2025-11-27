const UserView = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return <div>UserView id {id}</div>;
};

export default UserView;
