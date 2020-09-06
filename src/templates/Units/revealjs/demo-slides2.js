import * as React from "react";
import { CSSProperties, FunctionComponent } from "react";

const doItGoogleImgSearch =
	"https://www.google.com/search?q=do+it&rlz=1C1SQJL_enCA888CA888&sxsrf=ALeKk01R1aJZjGeFoyBcq5VKBdJkl197dQ:1583202513311&source=lnms&tbm=isch&sa=X&ved=2ahUKEwidh6f7oP3nAhUBzIUKHcG3C0UQ_AUoAXoECA4QAw&biw=2560&bih=979";

const nextStepClass = "fragment fade-left";
const nextSemiFadeClass = "fragment fade-in-then-semi-out";

const whatIsGitSlideId = "what-is-git";
const howGitWorksSlideId = "how-git-works";
const mergeAndRebaseSlideId = "merge-and-rebase";

const inlineCodeStyle = {
	fontWeight: "bold",
	backgroundColor: "rgba(255,103,52,0.67)",
	padding: "0.25rem 0.5rem",
	borderRadius: "0.2rem"
};

export default () => (
	<>
		<section id={whatIsGitSlideId}>
			<section>
				<h2>Qu'est-ce que Git?</h2>
				<p className={nextStepClass}>
					C'est un gestionnaire de versions de sources distribué, créé en 2005,
					par <b>Linus Torvalds</b>.
				</p>
				<p className={nextStepClass}>
					Git se distingue par sa flexibilité, sa performance, ses
					fonctionnalités avancées, et sa
					<span style={{ fontStyle: "italic", fontWeight: "bold" }}>
            "simplicité"
          </span>
					. C'est grâce à ces aspects qu'il est aujourd'hui le gestionnaire de
					sources <b>le plus populaire</b> chez les développeurs.
				</p>
				<p className={nextStepClass} style={{ fontStyle: "italic" }}>
					(Allez sur{" "}
					<a href="https://en.wikipedia.org/wiki/Git#Adoption">wikipédia</a> si
					vous ne me croyez pas)
				</p>
			</section>
			<section>
				<p>
					>
					<a href="https://github.com/dictcp/awesome-git#repository-hosting">
						Des plateformes comme Github, Bitbucket, GitLab, AWS CodeCommit,
						Gogs...
					</a>
				</p>
				<p className={nextStepClass}>
					>
					<a href="https://github.com/dictcp/awesome-git#client">
						Des outils comme GitKraken, TortoiseGit, SourceTree...
					</a>
				</p>
				<p className={nextStepClass}>
					>
					<a href="https://github.com/stevemao/awesome-git-addons">
						Des tonnes d'extensions !
					</a>
				</p>
				<p style={{ fontStyle: "italic" }} className={nextStepClass}>
					À noter que Git peut être utilisé avec ou sans serveur, tout en
					conservant la plupart de ses fonctionnalités.
				</p>
				<h3 className={nextStepClass}>
					<a href="https://git-scm.com/ ">git-scm.com</a>
				</h3>
			</section>
			<section data-background="http://i.giphy.com/90F8aUepslB84.gif"
							 className="present"
							 data-background-image="http://i.giphy.com/90F8aUepslB84.gif"
							 >
				<h2>... and GIFs!</h2>
			</section>
			<section>
				<h3>Un conseil perso...</h3>
				<p className={nextStepClass}>
					Apprenez à l'utiliser en ligne de commande!
				</p>
				<p
					className="fragment fade-in-then-out grow"
					style={{ fontSize: "4rem" }}
				>
					<a href={doItGoogleImgSearch}>FAITES-LE</a>
				</p>
			</section>
			<section>
				<h3 style={{ textDecoration: "underline" }}>Pourquoi :</h3>
				<ul>
					<li className={nextSemiFadeClass}>
						Aide à comprendre son fonctionnement
					</li>
					<li className={nextSemiFadeClass}>
						C'est un outil d'organisation flexible qui mérite d'être bien
						exploité
					</li>
					<li className={nextSemiFadeClass}>
						Vous permettra de scripter votre travail
					</li>
					<li className={nextSemiFadeClass}>
						Si vous savez utiliser Git en ligne de commande, vous savez utiliser
						n'importe quel outil Git (bah, presque).
					</li>
					<li className={"fragment"}>
						Ça pourrait vous sauver votre vie{" "}
						<span className={nextStepClass}>de développeur</span>
					</li>
				</ul>
			</section>
		</section>
	</>
);
