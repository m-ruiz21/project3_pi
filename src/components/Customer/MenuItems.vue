<template>
  <div class="container">
    <div v-for="(category, index) in categories" :key="index" style="margin-top: 2%;">
      <h1 :id="category.id" style="font-weight: bold;">{{ category.title }}</h1>
      <div class="row">
        <div v-for="(item, index) in category.items" :key="index" class="col-md-4">
          <router-link :to="item.link" class="nav-link"> 
            <div class="card border-0">
              <img :src="item.image" class="card-img-top" style="background-color: #F1F1EB;" alt="Bowl Image">
              <div class="card-body">
                <h5 class="card-title" style="font-size: 28px;">{{ item.name }}</h5>
                <p class="card-text"> {{ item.description }} </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          title: "BOWLS",
          id: "bowls",
          items: [
            {
              name: "Spicy Meatball Bowl",
              link: "bowl/meatball",
              image: "/food/SpicyMeatball.svg",
              description: "Spicy Meatball With Your Choice of Brown or Pilaf Rice, toppings, and dressing."
            },
            {
              name: "Falafel Bowl",
              link: "bowl/falafel",
              image: "/food/falafel bowl.svg",
              description: "Fresh Falafel With Your Choice of Brown or Pilaf Rice, toppings, and dressing"
            }
          ]
        },
        {
          title: "PITAS",
          id: "pitas",
          items: [
            {
              name: "Meatball Pita",
              link: "pita/meatball",
              image: "/food/meatball pita.svg",
              description: "Spicy Meatball in a warm pita with your choice of toppings and dressing."
            },
            {
              name: "Falafel Pita",
              link: "pita/falafel",
              image: "/food/falafel pita.svg",
              description: "Fresh Falafel in a warm pita with your choice of toppings and dressing."
            }
          ]
        }, 
        {
          title: "SIDES AND DRINKS",
          id: "sides-and-drinks",
          items: [
            {
              name: "Side Salad",
              link: "side/salad",
              image: "/food/Salad.svg",
              description: "Refreshing and Healthy Side Salad."
            },
            {
              name: "Hummus And Pita",
              link: "side/pita",
              image: "/food/pitas.svg",
              description: "Delicious freshly made hummus with warm pita bread."
            },
            {
              name: "Fountain Drink",
              link: "side/drink",
              image: "/food/drink.svg",
              description: "Refreshing fountain drink of your choice."
            }
          ]
        },
      ]
    }
  }
}
</script>

<style scoped>
  .card-img-top {
    width: 25vw;
    height: auto; 
  }

  .card {
    margin-top: 10px;
    max-width: 25vw;
  }

  @media (max-width: 767px) {
    .card-img-top {
      width: 100%;
      height: auto; 
    }

    .card {
      margin-top: 10px;
      max-width: 100%;
    }
  }
</style>