"use client";

import Loader from "@/components/Loader";
import Notfound from "@/components/Notfound";
import PaymentCard from "@/components/Payment";
import { Button } from "@/components/ui/button";
import { paymentMocks } from "@/constants/payment";
import { IPayment } from "@/types/payemnt";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const [load, setLoad] = useState(true);
  const router = useRouter();
  const [payments, setPayments] = useState<IPayment[]>(paymentMocks);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);
  return (
    <main className="w-full flex flex-col gap-4">
      <span className="p-4 sticky top-0 shadow-md bg-white flex items-center gap-3 text-xl font-semibold z-[95945]">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <h1>Pagamentos</h1>
      </span>

      {load ? (
        <div className="flex justify-center min-h-[70dvh] items-center scale-75">
          <Loader type="Spinner" />
        </div>
      ) : (
        <span>
          <Button
            className="fixed right-5 bottom-25 z-4"
            onClick={() => {
              router.push("/user/payments/create");
            }}
          >
            <CreditCard />
          </Button>
          {Array.isArray(payments) && payments.length > 0 ? (
            <aside className="flex flex-col gap-5 px-4 pb-30">
              {payments.map((item, key) => (
                <PaymentCard payment={item} key={key} />
              ))}
            </aside>
          ) : (
            <Notfound message="Nenhum pagamento feito" />
          )}
        </span>
      )}
    </main>
  );
}
