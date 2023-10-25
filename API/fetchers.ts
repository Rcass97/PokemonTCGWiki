export async function fetcher() {
    try {
        const response = await fetch('https://api.pokemontcg.io/v2/cards/base1-44', {
          method: 'GET',
          headers: {
            'Authorization': 'bdcafce3-4507-4ed0-9110-7ad780a12154',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

