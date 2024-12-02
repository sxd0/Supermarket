import BreadCrumbs from "../../components/BreadCrumbs";

const Cart = () => {
  const breadCrumbs = [
    {
      id: 1,
      title: "Главная",
      link: "/",
    },
    {
      id: 2,
      title: "Корзина",
      link: "#",
    },
  ];

  return (
    <>
      <BreadCrumbs items={breadCrumbs} />
      <h1>Страница корзины</h1>
    </>
  );
};

export default Cart;
