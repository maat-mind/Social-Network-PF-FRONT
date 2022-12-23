import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserDetailAsync } from "../../redux/actions/postActions";
import * as allIcons from "../../shared/assets/icons/all-icons";
import Card from "../../shared/components/Cards/Card";
import ButtonActions from "../../shared/components/ButtonActions/ButtonActions";
import "./Profile.css";
import Logout from "../Logout/Logout";

export default function Profile(props) {
	const id = localStorage.getItem("userId");
	const user = useSelector((state) => state.posts.userDetail);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserDetailAsync(id));
	}, [dispatch, id]);

	let history = useHistory();

	const goTo = (e) => {
		history.push("/reply/home");
	};

	return (
		<div className="profile-container">
			<div className="goToHome">
				<ButtonActions
					type="submit"
					action={goTo}
					id="all-icons"
					content={<img src={allIcons.arrowUp} alt="icon-home" />}
				/>
			</div>
			<div className="profile-container-logout">
				<Logout />
			</div>
			<div className="profile-container-dates">
				<div className="profile-container-user">
					<img
						src={user.image_profil || props.image_profil}
						alt="perfil"
						className="user-image"
					/>

					{/* <h3>{user && user.user_Name}</h3> */}
					<h3>{user.user_Name || props.user_Name}</h3>
				</div>
				<div className="profile-container-balance">
					<div className="profile-container-ff">
						<span>
							Follows: <p>{user.follow && props.follow}</p>
						</span>
						<span>
							Followers: <p>{user.followers && props.followers}</p>
							{/* facilitaria para mostrar que follow y followers sean numeros y no un arreglos en el modelo de la DB */}
						</span>
					</div>
					<div className="profile-container-ff">
						<img src={allIcons.cash} alt="cashicon" />
						<span>
							Your balance: <p>$ {props.cashValue}</p>
						</span>
					</div>
				</div>
			</div>
			<h1>Your posts</h1>
			<div className="profile-container-posts">
				{user.contents &&
					user.contents.map((data) => {
						return (
							<Card
								key={data._id}
								id={data._id}
								userId={data.userId._id}
								text={data.text}
								img={data.multimedia}
								username={user.user_Name}
								userImg={
									user.image_profil || props.profileImage
								}
								categories={data.category}
								comments={data.commentId}
								stripeId={data.userStripe}
								likes={data.likes}
								logedUser={id}
							/>
						);
					})}
			</div>
		</div>
	);
}

Profile.defaultProps = {
	image_profil:
		"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
	user_Name: "User Default",
	follow: "1",
	followers: "100000",
	cashValue: "999",
	userPosts: [
		{
			_id: "6393c28d810999a485add515",
			text: "video naruto",
			multimedia:
				"http://res.cloudinary.com/dqtgfhui8/image/upload/v1670627980/red%20social_image/gk6kgotgezfii9jnkcrt.png",
			multimedia_id: "red social_image/gk6kgotgezfii9jnkcrt",
			type: "video",
			commentId: [],
			__v: 0,
		},
		{
			_id: "6393d2ba9e5c2f221dbc759d5",
			text: "tarea",
			multimedia:
				"http://res.cloudinary.com/dqtgfhui8/image/upload/v1670632120/red%20social_image/qdqubmzaouj0efckckhp.png",
			multimedia_id: "red social_image/qdqubmzaouj0efckckhp",
			type: "texto",
			commentId: [],
			__v: 0,
		},
		{
			_id: "6393d3499e5c2f221dbc75a35",
			text: "video",
			multimedia:
				"http://res.cloudinary.com/dqtgfhui8/image/upload/v1670632264/red%20social_image/lj1ex7yrbvgkt4usl1dh.png",
			multimedia_id: "red social_image/lj1ex7yrbvgkt4usl1dh",
			type: "xxxxxxx",
			commentId: [],
			__v: 0,
		},
		{
			_id: "6393e18cd84ad0f60088bb6b5",
			text: "nora",
			multimedia:
				"http://res.cloudinary.com/dqtgfhui8/image/upload/v1670635914/red%20social_image/gykddfeuy3effmfujiji.png",
			multimedia_id: "red social_image/gykddfeuy3effmfujiji",
			type: "xxxxxxx",
			commentId: [],
			__v: 0,
		},
		{
			_id: "6394060cc4d2a5ecb1ed20035",
			text: "asdasdaas",
			multimedia:
				"http://res.cloudinary.com/dqtgfhui8/image/upload/v1670645259/cfpxyangiqypluoxqhyk.png",
			multimedia_id: "cfpxyangiqypluoxqhyk",
			commentId: [],
			__v: 0,
		},
	],
};
