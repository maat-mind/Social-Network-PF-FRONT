import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import cardcss from "./Card.css";
import { createComment } from "../../../redux/actions/commentsActions";
import { useDispatch } from "react-redux";
import {
	likeIcon,
	likeIconFilled,
	payIcon,
	sendIcon,
	shareIcon,
} from "../../assets/icons/all-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
	chekout,
	stripeAccountsConsult,
} from "../../../redux/actions/pagoActions";
import { likePostAsync } from "../../../redux/actions/postActions";
import LikeButton from "../../../Components/LikeButton/LikeButton";
// the props we are going to use are:
// img, username, imgUser, text
//hacer un efecto para ir a details, cuando paso por sobre la foto que se haga una spmbra o se agrande un poco...

function Card(props) {
	const MySwal = withReactContent(Swal);
	const obj = {
		username: "compañero guerra",
		imgUser:
			"https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9pbWFnZXMuY29pbnRlbGVncmFwaC5jb20vaW1hZ2VzLzcxN19hSFIwY0hNNkx5OXpNeTVqYjJsdWRHVnNaV2R5WVhCb0xtTnZiUzkxY0d4dllXUnpMekl3TWpFdE1UQXZNRGxpWVRaaU1Ea3ROR00wTmkwMFlqUmtMV0ZsT0RFdFlUWTNOakpoWVdReE56QmhMbXB3Wnc9PS5qcGc=.jpg",
		img: "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F679277%2Fshiba-inu-dogecoin-cryptocurrency-blockchain-network-getty.jpg&op=resize&w=700",
		text: "Hello, world!",
	};
	const dispatch = useDispatch();
	const [input, setInput] = useState({
		text: "",
		profileId: `${props.logedUser}`,
	});
	const history = useHistory();
	const [stripe, setStripe] = useState(false);

	const verificarStripe = async () => {
		if (props.stripeId) {
			/*const pagoActivo = await dispatch(
				stripeAccountsConsult(props.stripeId)
			);

			if (pagoActivo.data.capabilities.card_payments === "active") {
				setStripe(true);
			}*/
			setStripe(true);
		}
	};

	const handleInputChange = (event) => {
		setInput({
			...input,
			[event.target.name]: event.target.value,
		});
	};
	const pagoStripe = async (event) => {
		event.preventDefault();
		const pagoActivo = await dispatch(
			stripeAccountsConsult(props.stripeId)
		);
		if (pagoActivo.data.capabilities.card_payments === "active") {
			let price = "";
			MySwal.fire({
				position: "center",
				input: "select",
				inputOptions: {
					1: "$1",
					5: "$5",
					10: "$10",
				},
				inputPlaceholder: "Select donation ",
				icon: "question",
				title: "Cuanto deseas donar",
				showConfirmButton: true,
				showCancelButton: true,
			}).then(async (result) => {
				/* Read more about isConfirmed, isDenied below */
				if (result.isConfirmed) {
					if (result.value === "1")
						price = "price_1MFR4BAFCTt3dg6N5rtauWLe";
					if (result.value === "5")
						price = "price_1MFR8nAFCTt3dg6Nlc0bydXW";
					if (result.value === "10")
						price = "price_1MFR9oAFCTt3dg6NIuUBD8gC";

					const data = {
						id: props.stripeId,
						price: price,
					};
					const respuestaPago = await dispatch(chekout(data));
					window.open(respuestaPago.url);

					Swal.fire(
						"realizaste donacion de $" +
							result.value +
							" Muchas gracias!!"
					);
				} else {
					Swal.fire("Donacion cancelada");
					return;
				}
			});
		} else {
			return Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Parece que aún algo salio mal, el usuario aun no tiene todos los datos completos",
			});
		}
	};

	const [isLike, setIsLiked] = useState(false);
	const [likes, setLikes] = useState(props.likes.length);
	const [Icon, setIcon] = useState(likeIcon);

	function throttle(cb, delay) {
		let inThrottle;
		return (...args) => {
			if (inThrottle) return;
			inThrottle = true;
			cb(...args);
			setTimeout(() => {
				inThrottle = false;
			}, delay);
		};
	}

	const handleLike = (postId, userLoged) => {
		// setIsLiked(!isLike)
		dispatch(likePostAsync(postId, userLoged, props.token));
	};

	const throttleHandleLike = throttle(handleLike, 1200);

	useEffect(() => {
		// setIcon(isLike ? likeIconFilled : likeIcon)
		setLikes(props.likes.length);
		verificarStripe();
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		MySwal.fire({
			position: "top-end",
			icon: "success",
			title: "Comentario Posteado Correctamente",
			showConfirmButton: false,
			timer: 1500,
		});
		dispatch(createComment(input, props.id));
		setInput({
			text: "",
		});
		// history.push('/reply/home')
	};

	return (
		<div
			id="cardContainer"
			className="container d-flex justify-content-center flex-column mb-5 p-0  w-auto h-auto"
		>
			<div className="d-flex">
				<div className="p-1">
					<div className="container px-4 pt-4 m-0">
						<div className="d-flex col m-0">
							<div>
								{props.resourseType === "image" ? (
									<img
										className="imgCard"
										src={props.img || obj.img}
										alt="postImg"
									></img>
								) : (
									<iframe
										className="embed-responsive-item imgCard"
										title="user video"
										src={props.img || obj.img}
										frameBorder="0"
										seamless
										allowFullScreen
									></iframe>
								)}
							</div>

							<div className="ms-3">
								<div className="d-flex justify-content-around align-items-center my-3">
									<img
										className="userImgCard img-fluid"
										src={props.userImg || obj.imgUser}
										alt="userImg"
									></img>
									<p className="fs-3 fw-bold text-white m-0 me-3">
										{props.username || obj.username}
									</p>
								</div>
								<div className="containerContentInfo">
									<p className="p-2 m-0 h-100">
										{props.text || obj.text}
									</p>
								</div>
								<a
									className="text-morecomments"
									href={`/reply/postdetail/${props.id}`}
								>
									Ver todos los comentarios...
								</a>
							</div>
						</div>
					</div>

					<div className="d-flex color-white ps-4 align-items-center">
						<p className="fs-1 m-2 fw-bold">#</p>
						<div className="d-flex align-items-center">
							{props.categories?.map((e) => {
								return (
									<p className="m-2 p-2 text-center card-container-categories">
										{e}{" "}
									</p>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			<div className="comments px-4 d-flex align-items-center justify-content-evenly m-0">
				<div className="d-flex  flex-column">
					<img
						src={Icon}
						className="icon-size"
						alt="icon de likes"
						onClick={() => {
							throttleHandleLike(props.id, props.logedUser);
						}}
					/>
					<p className="fw-bold m-0">{likes}</p>
					{/* <LikeButton
					postId={props.id}
					userLoged={props.logedUser}
					likes={props.likes}
					/> */}
				</div>
				<div className="inp p-2 d-flex justify-content-around">
					<input
						className="inp text-start"
						value={input.text}
						name="text"
						placeholder="Escribe un comentario ..."
						onChange={handleInputChange}
					/>
					<img
						src={sendIcon}
						onClick={handleSubmit}
						className="curser-pointer-card icon-size m-2 "
						alt="icon de share"
					/>
				</div>
				<div className="d-flex justify-content-center align-items-center">
					{stripe && (
						<img
							src={payIcon}
							onClick={pagoStripe}
							className="icon-size m-2"
							alt="icon de pay"
						/>
					)}
					<img
						src={shareIcon}
						className="icon-size m-2"
						alt="icon de share"
					/>
				</div>
			</div>
			<div className={cardcss}></div>
		</div>
	);
}
// recordar que este link es para el detalle

export default Card;
