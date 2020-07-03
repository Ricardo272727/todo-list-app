
mkdir ./src/screens/$1
touch ./src/screens/$1/$1.jsx
touch ./src/screens/$1/$1.scss
echo -e "import React from 'react'; \nimport \"./$1.scss\"; \n\nconst $1 = props => {\n return null;\n} \n\nexport default $1;" >> ./src/screens/$1/$1.jsx





