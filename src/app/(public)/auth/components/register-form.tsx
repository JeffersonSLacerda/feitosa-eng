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
import { useForm } from "react-hook-form"
import { z } from "zod"

const registerFormSchema = z.object({
  name: z.string().trim().min(3, { message: "Nome é obrigatório" }).max(50),
  email: z.string().trim().email({ message: "E-mail inválido" }),
  cellPhone: z.string().trim().min(11, { message: "Celular inválido" }),
  password: z.string().trim().min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
  confirmPassword: z.string().trim().min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
})

const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      cellPhone: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
              name="cellPhone"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu celular" {...field} type="tel" />
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
              disabled={form.watch("password") !== form.watch("confirmPassword")}
            >
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