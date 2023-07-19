import { fetchBreeds, fetchCatByBreed } from './cat-api';

const select = document.getElementsByClassName('breed-select')[0];
const loader = document.getElementsByClassName('loader')[0];
const error = document.getElementsByClassName('error')[0];
const catInfo = document.getElementsByClassName('cat-info')[0];

fetchBreeds()
  .then(data => {
    //   console.log(data);
    select.innerHTML = data
      .map(({ id, name }) => `<option value = "${id}"> ${name}</option>`)
      .join('<br>');

    error.style.display = 'none';
    loader.style.display = 'none';
    select.style.display = 'block';
  })
  .catch(() => {
    loader.style.display = 'none';
    select.style.display = 'none';
    error.style.display = 'block';
  });

select.addEventListener('change', event => {
  loader.style.display = 'block';
  error.style.display = 'none';
  catInfo.style.display = 'none';

  const id = event.currentTarget.value;

  function createCatMenu(data) {
    return data
      .map(
        ({ url, breeds: [{ name, description, temperament }] }) =>
          `<div>
              <img src="${url}" alt="${name}" width="400px"style="margin-right: 20px; margin-top: 20px" />
            </div>
         <div>
              <h2>${name}</h2>
              <p>${description}</p>
              <p> <span>Temperament: </span>${temperament}</p>
         </div>`
      )
      .join('');
  }

  fetchCatByBreed(id)
    .then(data => {
      //   console.log(data);
      catInfo.innerHTML = createCatMenu(data);

      loader.style.display = 'none';
      error.style.display = 'none';
      catInfo.style.display = 'flex';
    })
    .catch(() => {
      loader.style.display = 'none';
      error.style.display = 'block';
    });
});
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  STYLES
select.style = `margin-left: auto; margin-right: auto; height: 30px; text-align: center; background-color: #ededed; border-radius: 30px;`;
loader.style = 'text-align: center; -webkit-text-stroke: thin;';
error.style = 'text-align: center; -webkit-text-stroke: thin; display: none;';
