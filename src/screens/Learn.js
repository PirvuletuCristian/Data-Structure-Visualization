import React from 'react'
import './docStyle.css'
import {Link} from 'react-router-dom';

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
            <ol class="nav flex-column mt-4">
              <li class="nav-item"><a class="nav-link" href="#ArboriBinari">Arbori Binari</a></li>
              <li class="nav-item"><a class="nav-link" href="#ParcurgereaArborilor">Parcurgerea Arborilor</a></li>
              <li class="nav-item"><a class="nav-link" href="#Javascript_and_Java">JavaScript and Java</a></li>
              <li class="nav-item"><a class="nav-link" href="#Hello_world">Hello world</a></li>
              <li class="nav-item"><a class="nav-link" href="#Variables">Variables</a></li>
              <li class="nav-item"><a class="nav-link" href="#Declaring_variables">Declaring variables</a></li>
              <li class="nav-item"><a class="nav-link" href="#Declaring_variables">Declaring variables</a></li>
              <li class="nav-item"><a class="nav-link" href="#Declaring_variables">Declaring variables</a></li>
              <li class="nav-item"><a class="nav-link" href="#Declaring_variables">Declaring variables</a></li>
              <li class="nav-item"><a class="nav-link" href="#Declaring_variables">Declaring variables</a></li>
              <li class="nav-item"><a class="nav-link" href="#Declaring_variables">Declaring variables</a></li>
              <li class="nav-item"><a class="nav-link" href="#Declaring_variables">Declaring variables</a></li>
              <li class="nav-item"><a class="nav-link" href="#Variables">Variables</a></li>
              <li class="nav-item"><a class="nav-link" href="#Declaring_variables">Declaring variables</a></li>
            </ol>
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
              <p>??n ??tiin??a calculatoarelor, termenul de arbore este folosit pentru a desemna o structur?? de date care respect?? defini??ia de mai sus, ??ns?? are asociate un nod r??d??cin?? ??i o orientare ??nspre sau opus?? r??d??cinii.</p>
              <p>Arborii sunt folosi??i ??n general pentru a modela o ierarhie de elemente.</p>
              <p>Astfel, fiecare element (nod) poate de??ine un num??r de unul sau mai mul??i descenden??i, iar ??n acest caz nodul este numit p??rinte al nodurilor descendente (copii sau fii).</p>
              <p>Fiecare nod poate avea un singur nod p??rinte. Un nod f??r?? descenden??i este un nod terminal, sau nod frunz??.</p>
              <p>??n schimb, exist?? un singur nod f??r?? p??rinte, iar acesta este ??ntotdeauna r??d??cina arborelui</p>
              <p>Un arbore binar este un caz special de arbore, ??n care fiecare nod poate avea maxim doi descenden??i:</p>
              <li>nodul st??ng</li>
              <li>nodul drept</li>
              <br />
              <button><Link to="/ArboriBinari">Chestionar</Link></button>
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
