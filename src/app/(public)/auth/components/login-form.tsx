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

const loginFormSchema = z.object({
  email: z.string().trim().email({ message: "E-mail inválido" }),
  password: z.string().trim().min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
})

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values)
    
  }

  return (
    <Card className="w-full max-w-md my-2 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Faça login para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem >
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

            <Button 
              type="submit" 
              className="w-full mt-4"
            >
              Entrar
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
 
export default LoginForm;