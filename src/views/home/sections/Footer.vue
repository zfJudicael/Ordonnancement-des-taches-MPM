<template>
    <footer>
        <div class="info">
            <p class="copyright">&#169; 2026</p>
            <p class="description">
                Développé par <strong><a href="https://www.linkedin.com/in/fanny-judica%C3%ABl-zafimaroroka-777108367/" target="_blank">Fanny Judicaël ZAFIMAROROKA</a></strong>
            </p>
        </div>

        <div class="contact">
            <div class="item">
                <div>
                    <i class="pi pi-envelope"></i>
                    <p>Email :</p>
                </div>
                <p>fzafimaroroka@gmail.com</p>
            </div>

            <div class="item">
                <div>
                    <i class="pi pi-whatsapp"></i>
                    <p>WhatsApp : </p>
                </div>
                <p>+261 32 51 811 81</p>
            </div>
        </div>
    </footer>
</template>

<style lang="scss">
footer{
    background-color: #1f2937;
    color: #e5e7eb;
    padding: 60px 20px;

    .info{
        text-align: center;
        a{
            text-decoration: underline;
            color: inherit;
        }
    }

    .contact{
        .item{
            margin: 15px 0;

            div{
                display: flex; 
                align-items: baseline; 
                gap: 6px;
            }

            p{
                margin: 4px 0;
            }
        }
    }
}

@media (min-width: 768px) {
    footer{
        padding: 80px;
        display: flex;
        justify-content: space-between;

        .info{
            text-align: left;
        }

        .contact{
            .item{
                display: flex;
                gap: 8px;
            }
        }
    }
}
</style>