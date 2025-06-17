"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/components/ui/form"
import { Input } from "@src/components/ui/input"
import { authClient } from "@src/lib/auth-client"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const registerFormSchema = z.object({
  name: z.string().trim().min(3, { message: "Nome é obrigatório" }).max(50),
  email: z.string().trim().email({ message: "E-mail inválido" }),
  password: z.string().trim().min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
  confirmPassword: z.string().trim().min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
})

const RegisterForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // TODO on create account, add cellPhone to the user table
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log("Form values: ", values)
    await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      callbackURL: "/home",
    }, {
      onSuccess: () => {
        router.push("/home")
      },
    });
  }

  return (
    <Card className="w-full max-w-md my-2 overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <CardHeader>
            <CardTitle>Criar Conta</CardTitle>
            <CardDescription>
              Crie uma conta para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
        
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu e-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite sua senha" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirme sua senha" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full mt-4"
              disabled={form.watch("password") !== form.watch("confirmPassword") || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              )}
              {form.watch("password") !== form.watch("confirmPassword") 
                ? "As senhas não coincidem" 
                : "Criar Conta"}
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
 
export default RegisterForm;