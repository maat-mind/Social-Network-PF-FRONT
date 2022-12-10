import Box from '@mui/material/Box'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getByCategory } from '../../../../redux/reducer/postsReducer'
import './DialogCategories.css'

/*
  Este Dialog permite mostrar en un cuadro aparte las categorías
  que el usuario puede encontrar en la página para filtrar las
  publicaciones en su feed
*/

export default function ClickAway({ buttonContent, innerContent }) {
  const dispatch = useDispatch()

  const posts = useSelector((state) => state.posts.posts[0])
  // console.log(posts)

  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState({})

  const handlePress = (e) => {
    let { id, style } = e.target

    if (active[id]) {
      setActive({
        ...active,
        [id]: false,
      })
    } else {
      setActive({
        ...active,
        [id]: true,
      })
    }

    active[id] ? (style.color = 'white') : (style.color = 'black')
  }

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  const styles = {
    position: 'absolute',
    top: 40,
    right: 0,
    left: '-30vw',
    zIndex: 1,
    border: 'none',
    borderRadius: '25px',
    p: 1,
    padding: '15px 70px',
    width: '50vw',
    height: 'auto',
    textAlign: 'left',
    bgcolor: '#D9D9D9',
    boxShadow:
      'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
  }

  React.useEffect(() => {
    /*
     * Array de categorías extraídas del objeto active
     */
    function getCategories(obj) {
      const activeCategories = new Set()

      for (const key in obj) {
        obj[key] ? activeCategories.add(key) : activeCategories.delete(key)
      }

      const activeCategoriesArr = Array.from(activeCategories)

      return activeCategories.size > 0 ? activeCategoriesArr : false
    }

    dispatch(getByCategory(getCategories(active)))
  }, [dispatch, active])

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative' }}>
        <li type='button' onClick={handleClick}>
          {buttonContent}
        </li>
        {open ? (
          <Box sx={styles}>
            <h3 className='categories-title'>Categorías destacadas</h3>
            <section className='d-flex flex-wrap'>
              {innerContent?.map((inner) => (
                <button
                  id={inner}
                  className='button-inner'
                  onClick={handlePress}>
                  {inner}
                </button>
              ))}
            </section>
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  )
}
