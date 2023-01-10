import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Loader from '../../loader/loader'
import TablePosts from '../../Table/TablePosts'
import { Switch } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updatePostStatus } from '../../../../redux/actions/adminActions'
import { getAllPostsAsync } from '../../../../redux/actions/postActions'
import { allPostsSelector } from '../../../../redux/reducer/postsReducer'

export default function DialogTablePost({ open, setOpen, userId }) {
	const dispatch = useDispatch()
	const token = localStorage.getItem('token')
	const posts = useSelector(allPostsSelector)
	const userPost = posts.filter((post) => post.userId._id === userId)

	const [loader, setLoader] = useState(false)

	const handleClose = () => {
		setOpen(false)
	}

	const postStatusUpdate = (event, id) => {
		event.preventDefault()
		dispatch(updatePostStatus(id, token))
	}

	useEffect(() => {
		dispatch(getAllPostsAsync(token))
	}, [dispatch, token])

	const columns = [
		{
			label: 'id',
			renderCell: (item) => item._id,
		},
		{
			label: 'texto',
			renderCell: (item) => item.text,
		},
		{
			label: 'multimedia',
			renderCell: (item) => {
				return (
					<a
						href={item.multimedia}
						target='_blank'
						rel='noreferrer'
						alt='multimedia'
					>
						link
					</a>
				)
			},
		},
		{
			label: 'estado',
			renderCell: (item) => (
				<Switch
					checked={item.status}
					onChange={(event) => postStatusUpdate(event, item._id)}
					color='warning'
				/>
			),
		},
	]

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='responsive-dialog-title'
		>
			<div className='dialog-bg overflow-hidden'>
				{loader && <Loader />}

				<DialogContent>
					<TablePosts columns={columns} nodes={userPost} />
				</DialogContent>
			</div>
		</Dialog>
	)
}
