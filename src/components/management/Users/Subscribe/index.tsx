import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import router from "next/router";

import useUser from "hooks/useUser";

import { Container, Form, RowForm } from "./styles";
import useAuth from "hooks/useAuth";
import { IUserDTO } from "dtos/IUserDTO";

interface ISubscribeUserProps {
  id: string;
}

const SubscribeUser = ({ id }: ISubscribeUserProps) => {
  const { subscribeUser, toggleOperation } = useUser();
  const { userLogged, verify } = useAuth();

  const [idSubscribe, setIdSubscribe] = useState<string>("");
  const [plan, setPlan] = useState<"quarterly" | "semiannual" | "yearly">(
    "quarterly"
  );
  const [planValue, setPlanValue] = useState<number>(40);
  const [discountCoupon, setDiscountCoupon] = useState<string>("");
  const [condition, setCondition] = useState<
    "normalSale" | "discountSale" | "courtesy"
  >("normalSale");
  const [discount, setDiscount] = useState<number>(0);
  const [amount, setAmount] = useState<number>(40);

  useEffect(() => {
    verify();
    if (userLogged && userLogged.level !== "admin" && id !== userLogged.id) {
      toast.error("acesso não autorizado");
      router.push("/");
    }
    setIdSubscribe(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlan = (planSelected: "quarterly" | "semiannual" | "yearly") => {
    setPlan(planSelected);
    const value =
      planSelected === "quarterly"
        ? 40
        : planSelected === "semiannual"
        ? 70
        : 100;
    setPlanValue(value);
    setAmount(discount > 0 ? value - value * (discount / 100) : value);
  };

  const handleCondition = (
    conditionSelected: "normalSale" | "discountSale" | "courtesy"
  ) => {
    setCondition(conditionSelected);

    const discountSelected =
      conditionSelected === "courtesy"
        ? 100
        : conditionSelected === "discountSale"
        ? 10
        : 0;

    setDiscount(discountSelected);

    setAmount(
      discountSelected > 0
        ? planValue - planValue * (discountSelected / 100)
        : planValue
    );
  };

  const handleDiscount = (discountSelected: number) => {
    setDiscount(discountSelected);

    setAmount(
      discountSelected > 0
        ? planValue - planValue * (discountSelected / 100)
        : planValue
    );
  };

  const handleCancel = () => {
    toggleOperation("list");
    router.push("/usuarios");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await subscribeUser(id, plan, condition, discount, amount);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h3>Assinatura BomberQuiz</h3>

        <RowForm>
          <label htmlFor="idSubscribe">Código do Assinante (ID):</label>
          <input
            type="text"
            id="id"
            disabled={userLogged?.level !== "admin"}
            value={idSubscribe}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setIdSubscribe(e.target.value)
            }
          />
        </RowForm>

        <RowForm>
          <label htmlFor="plan">Planos:</label>
          <select
            value={plan}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handlePlan(
                e.target.value === "quarterly"
                  ? "quarterly"
                  : e.target.value === "semiannual"
                  ? "semiannual"
                  : "yearly"
              )
            }
          >
            <option value="quarterly">Trimestral - R$ 40,00</option>
            <option value="semiannual">Semestral - R$ 70,00</option>
            <option value="yearly">Anual - R$100,00</option>
          </select>
        </RowForm>

        {userLogged?.level !== "admin" && (
          <RowForm>
            <label htmlFor="discountCoupon">Cupom de Desconto:</label>
            <input
              type="text"
              id="discountCoupon"
              value={discountCoupon}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDiscountCoupon(e.target.value)
              }
            />
          </RowForm>
        )}

        {userLogged?.level === "admin" && (
          <>
            <RowForm>
              <label htmlFor="plan">Condição:</label>
              <select
                value={condition}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleCondition(
                    e.target.value === "normalSale"
                      ? "normalSale"
                      : e.target.value === "discountSale"
                      ? "discountSale"
                      : "courtesy"
                  )
                }
              >
                <option value="normalSale">Venda normal</option>
                <option value="discountSale">Venda com desconto</option>
                <option value="courtesy">Cortesia</option>
              </select>
            </RowForm>

            {condition === "discountSale" && (
              <RowForm>
                <label htmlFor="discount">Desconto (%):</label>
                <input
                  type="number"
                  id="discount"
                  value={discount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleDiscount(e.target.valueAsNumber)
                  }
                />
              </RowForm>
            )}
          </>
        )}

        <RowForm>
          <label htmlFor="amount">Total a pagar:</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAmount(parseInt(e.target.value))
            }
          />
        </RowForm>

        <RowForm>
          <button className="cancel" type="button" onClick={handleCancel}>
            Cancelar
          </button>
          <button className="success" type="submit">
            Salvar
          </button>
        </RowForm>
      </Form>
    </Container>
  );
};

export default SubscribeUser;
