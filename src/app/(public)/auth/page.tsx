import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs"

import LoginForm from "./components/login-form"
import RegisterForm from "./components/register-form"

const AuthPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-full max-w-sm">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Criar Conta</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>

        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
 
export default AuthPage;