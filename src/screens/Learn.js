import React from 'react'
import './docStyle.css'

export default function BSTDoc() {
  return (
    <section>
      <div class="page-wrap">
      <div class="row">
      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5">
        <nav id="navbar" class="navbar-movil navbar-expand-sm">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMini" aria-controls="navMini" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
                        </button>
          <div class="collapse navbar-collapse" id="navMini">
            <ul class="nav flex-column mt-4">
              <li class="nav-item"><a class="nav-link" href="#ArboriBinari">Arbori Binari</a></li>
              <li class="nav-item"><a class="nav-link" href="#ParcurgereaArborilor">Parcurgerea Arborilor</a></li>
              <li class="nav-item"><a class="nav-link" href="#Javascript_and_Java">JavaScript and Java</a></li>
              <li class="nav-item"><a class="nav-link" href="#Hello_world">Hello world</a></li>
              <li class="nav-item"><a class="nav-link" href="#Variables">Variables</a></li>
              <li class="nav-item"><a class="nav-link" href="#Declaring_variables">Declaring variables</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="col-xl-10 col-lg-9 col-md-8 col-sm-7">
      <main id="main-doc">
          <div class="main-section" id="ArboriBinari">
            <header>Arbori Binari</header>
            <hr/>
            <article>
              <p>Matematic, un arbore este un graf neorientat conex aciclic</p>
              <p>În ştiinţa calculatoarelor, termenul de arbore este folosit pentru a desemna o structură de date care respectă definiţia de mai sus, însă are asociate un nod rădăcină şi o orientare înspre sau opusă rădăcinii.</p>
              <p>Arborii sunt folosiţi în general pentru a modela o ierarhie de elemente.</p>
              <p>Astfel, fiecare element (nod) poate deţine un număr de unul sau mai mulţi descendenţi, iar în acest caz nodul este numit părinte al nodurilor descendente (copii sau fii).</p>
              <p>Fiecare nod poate avea un singur nod părinte. Un nod fără descendenţi este un nod terminal, sau nod frunză.</p>
              <p>În schimb, există un singur nod fără părinte, iar acesta este întotdeauna rădăcina arborelui</p>
              <p>Un arbore binar este un caz special de arbore, în care fiecare nod poate avea maxim doi descendenţi:</p>
              <li>nodul stâng</li>
              <li>nodul drept</li>
              <br />
              <button>Chestionar</button>
            </article>
          </div>
          <div class="main-section" id="ParcurgereaArborilor">
            <header>Parcurgerea Arborilor</header>
            <hr/>
            <article>
            <p>Parcurgerea arborilor binari este aceiasi pentru toate tipurile acestora:</p>
              <li>Inorder</li>
              <li>Preorder</li>
              <li>Postorder</li>
            </article>
          </div>
      <br/>
      </main>
      </div>
      </div>
      </div>
    </section>
    
  )
}
