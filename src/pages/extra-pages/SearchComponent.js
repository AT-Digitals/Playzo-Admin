import { FormControl, InputAdornment, OutlinedInput, Box } from '@mui/material'
import { SearchOutlined } from '@ant-design/icons'

const SearchComponent = ({ placeholder }) => {
  return (
    <Box sx={{ width: '250px', ml: { xs: 0, md: 1 } }}>
      <FormControl>
        <OutlinedInput
          size="small"
          id="header-search"
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchOutlined />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            'aria-label': 'weight',
          }}
          sx={{ '.MuiInputBase-input.MuiOutlinedInput-input': { padding: '15px 20px' } }}
          placeholder={placeholder}
        />
      </FormControl>
    </Box>
  )
}
export default SearchComponent
