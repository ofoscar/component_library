import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <RegisterForm />
      </div>
    </div>
  );
}
