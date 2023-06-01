

// import React, { useState } from 'react';

// import { SearchIcon } from "@chakra-ui/icons";
// import { Box, Input, InputGroup, InputLeftElement, List, ListItem, Text, VStack } from "@chakra-ui/react";
// import { useState } from "react";

// const Demo = () => {

//     const [expression, setExpression] = useState([]);

//     const [component, setComponent] = useState([]);

//     const [componentType, setComponentType] = useState('Input');

//     const [componentValue, setComponentValue] = useState('');

//     const [componentName, setComponentName] = useState('');

//     const [componentId, setComponentId] = useState('');

//     const [arg, setArg] = useState([]);
//     const addArg = () => {
//         let obj = { id: new Date(Date.now()), name: 'abc', value: true };
//         setArg([...arg, obj]);
//         console.log(arg);

//     };

//     const hanleChange = (e) => {
//         let newArr = arg.map((item) => {
//             if (item.id == e.target.id) {
//                 item.name = e.target.value;
//             }
//             return item;
//         });

//         setArg(newArr);
//     };

//     const handleValue = (id) => {
//         let newArr = arg.map((item) => {
//             if (item.id == id) {
//                 item.value = !item.value;
//             }
//             return item;
//         });
//         setArg(newArr);
//     };


//     const handeleDelete = (id) => {
//         let newArr = arg.filter((item) => item.id != id);
//         setArg(newArr);
//     };

//     const handleChange = (value) => {
//         setComponentType(value);
//     };


//     return (
//         <div>
//             {
//                 arg?.map((item, index) => {
//                     return (
//                         <div key={index}>
//                             <input style={{ border: "1px solid black" }} type="text" name="" id={item.id} value={item.name} onChange={(e) => hanleChange(e)} />
//                             <select style={{ border: "1px solid black" }} name="" id="" onChange={() => handleValue(item.id)}>
//                                 <option value="true">true</option>
//                                 <option value="false">false</option>
//                             </select>
//                             <button style={{ border: "1px solid black", bg: "yellow" }} onClick={() => handeleDelete(item.id)}>X</button>
//                         </div>
//                     )
//                 }
//                 )
//             }
//             <button style={{ border: "1px solid black", bg: "yellow" }} onClick={addArg}>+ add arg</button>

//             <select name="" id="" onChange={(e) => handleChange(e.target.value)} >
//                 <option value="const">
//                     <select name="" id="">
//                         <option value="">hi</option>
//                         <option value="">hdwf</option>
//                         <option value="">h1</option>
//                     </select>
//                 </option>

//             </select>

//         </div>
//     );
// };

// export default Demo;

// import React, { useState } from 'react';

// const Demo = () => {
//     const [expression, setExpression] = useState([]);
//     const [componentType, setComponentType] = useState('Input');
//     const [componentValue, setComponentValue] = useState('');
//     const [componentName, setComponentName] = useState('');
//     const [componentId, setComponentId] = useState('');
//     const [arg, setArg] = useState([]);

//     const addArg = () => {
//         const newObj = { id: new Date().getTime(), name: 'abc', value: true };
//         setArg([...arg, newObj]);
//     };

//     const handleChange = (e) => {
//         setComponentType(e.target.value);
//     };

//     const handleInputChange = (e) => {
//         setComponentValue(e.target.value);
//     };

//     const handleComponentNameChange = (e) => {
//         setComponentName(e.target.value);
//     };

//     const handleAddComponent = () => {
//         if (componentType === 'const') {
//             const newComponent = {
//                 id: new Date().getTime(),
//                 type: 'const',
//                 value: componentValue,
//             };
//             setExpression([...expression, newComponent]);
//             setComponentValue('');
//         } else if (componentType === 'arg') {
//             const newComponent = {
//                 id: new Date().getTime(),
//                 type: 'arg',
//                 name: componentName,
//             };
//             setExpression([...expression, newComponent]);
//             setComponentName('');
//         }
//     };

//     const handleDeleteComponent = (id) => {
//         const newExpression = expression.filter((component) => component.id !== id);
//         setExpression(newExpression);
//     };

//     return (
//         <div>
//             {expression.map((component) => (
//                 <div key={component.id}>
//                     {component.type === 'const' && <span>{component.value}</span>}
//                     {component.type === 'arg' && <span>{component.name}</span>}
//                     <button onClick={() => handleDeleteComponent(component.id)}>X</button>
//                 </div>
//             ))}
//             {arg.map((item, index) => (
//                 <div key={index}>
//                     <input
//                         style={{ border: '1px solid black' }}
//                         type="text"
//                         value={item.name}
//                         onChange={(e) => {
//                             const newArr = [...arg];
//                             newArr[index].name = e.target.value;
//                             setArg(newArr);
//                         }}
//                     />
//                     <select
//                         style={{ border: '1px solid black' }}
//                         value={item.value.toString()}
//                         onChange={(e) => {
//                             const newArr = [...arg];
//                             newArr[index].value = e.target.value === 'true';
//                             setArg(newArr);
//                         }}
//                     >
//                         <option value="true">true</option>
//                         <option value="false">false</option>
//                     </select>
//                     <button
//                         style={{ border: '1px solid black', bg: 'yellow' }}
//                         onClick={() => {
//                             const newArr = arg.filter((_, i) => i !== index);
//                             setArg(newArr);
//                         }}
//                     >
//                         X
//                     </button>
//                 </div>
//             ))}
//             <button
//                 style={{ border: '1px solid black', bg: 'yellow' }}
//                 onClick={addArg}
//             >
//                 + add arg
//             </button>

//             <select name="" id="" onChange={handleChange}>
//                 <option value="const">Constant</option>
//                 <option value="arg">Arg</option>
//             </select>

//             {componentType === 'const' && (
//                 <div>
//                     <label>Value:</label>
//                     <input
//                         type="text"
//                         value={componentValue}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//             )}

//             {componentType === 'arg' && (
//                 <div>
//                     <label>Name:</label>
//                     <input
//                         type="text"
//                         value={componentName}
//                         onChange={handleComponentNameChange}
//                     />
//                 </div>
//             )}

//             <button onClick={handleAddComponent}>Add Component</button>
//         </div>
//     );
// };

// export default Demo;


// // const Demo = () => {
// //     const [expression, setExpression] = useState([]);
// //     const [componentType, setComponentType] = useState('const');
// //     const [componentValue, setComponentValue] = useState('');
// //     const [componentName, setComponentName] = useState('');
// //     const [componentId, setComponentId] = useState('');
// //     const [componentPlaceholder, setComponentPlaceholder] = useState('');
// //     const [componentLabel, setComponentLabel] = useState('');

// //     const [args, setArgs] = useState([]);

// //     const handleComponentChange = (value) => {
// //         setComponentType(value);
// //     };

// //     const handleAddComponent = () => {
// //         let component = null;

// //         if (componentType === 'const') {
// //             component = {
// //                 id: new Date().getTime(),
// //                 type: componentType,
// //                 value: componentValue,
// //             };
// //         } else if (componentType === 'arg') {
// //             component = {
// //                 id: new Date().getTime(),
// //                 type: componentType,
// //                 name: componentName,
// //                 placeholder: componentPlaceholder,
// //                 label: componentLabel,
// //             };
// //         } else if (componentType === 'and' || componentType === 'or') {
// //             component = {
// //                 id: new Date().getTime(),
// //                 type: componentType,
// //                 children: [],
// //             };
// //         }

// //         setExpression([...expression, component]);
// //         resetComponentState();
// //     };

// //     const handleAddArgument = () => {
// //         setArgs([...args, { name: '', value: true }]);
// //     };

// //     const handleArgChange = (index, field, value) => {
// //         const updatedArgs = args.map((arg, i) => {
// //             if (i === index) {
// //                 return { ...arg, [field]: value };
// //             }
// //             return arg;
// //         });
// //         setArgs(updatedArgs);
// //     };

// //     const handleDeleteArg = (index) => {
// //         const updatedArgs = args.filter((arg, i) => i !== index);
// //         setArgs(updatedArgs);
// //     };

// //     const handleAddChildComponent = (parentId) => {
// //         const updatedExpression = expression.map((component) => {
// //             if (component.id === parentId) {
// //                 const child = {
// //                     id: new Date().getTime(),
// //                     type: componentType,
// //                     children: [],
// //                 };
// //                 component.children.push(child);
// //             }
// //             return component;
// //         });
// //         setExpression(updatedExpression);
// //         resetComponentState();
// //     };

// //     const resetComponentState = () => {
// //         setComponentType('const');
// //         setComponentValue('');
// //         setComponentName('');
// //         setComponentId('');
// //         setComponentPlaceholder('');
// //         setComponentLabel('');
// //     };

// //     const renderExpression = (components) => {
// //         return components.map((component) => {
// //             if (component.type === 'const') {
// //                 return (
// //                     <div key={component.id}>
// //                         <span>{component.value}</span>
// //                     </div>
// //                 );
// //             } else if (component.type === 'arg') {
// //                 return (
// //                     <div key={component.id}>
// //                         <span>{component.name}</span>
// //                         <span>{component.placeholder}</span>
// //                         <span>{component.label}</span>
// //                     </div>
// //                 );
// //             } else if (component.type === 'and' || component.type === 'or') {
// //                 return (
// //                     <div key={component.id}>
// //                         <span>{component.type}</span>
// //                         <button onClick={() => handleAddChildComponent(component.id)}>
// //                             Add Child
// //                         </button>
// //                         {renderExpression(component.children)}
// //                     </div>
// //                 );
// //             }
// //         });
// //     };

// //     return (
// //         <div>
// //             {renderExpression(expression)}

// //             <div>
// //                 <label>Component Type:</label>
// //                 <select
// //                     name=""
// //                     id=""
// //                     value={componentType}
// //                     onChange={(e) => handleComponentChange(e.target.value)}
// //                 >
// //                     <option value="const">Constant</option>
// //                     <option value="arg">Arg</option>
// //                     <option value="and">And</option>
// //                     <option value="or">Or</option>
// //                 </select>
// //             </div>

// //             {componentType === 'const' && (
// //                 <div>
// //                     <label>Value:</label>
// //                     <input
// //                         type="text"
// //                         value={componentValue}
// //                         onChange={(e) => setComponentValue(e.target.value)}
// //                     />
// //                 </div>
// //             )}

// //             {componentType === 'arg' && (
// //                 <div>
// //                     <label>Name:</label>
// //                     <input
// //                         type="text"
// //                         value={componentName}
// //                         onChange={(e) => setComponentName(e.target.value)}
// //                     />
// //                     <label>Placeholder:</label>
// //                     <input
// //                         type="text"
// //                         value={componentPlaceholder}
// //                         onChange={(e) => setComponentPlaceholder(e.target.value)}
// //                     />
// //                     <label>Label:</label>
// //                     <input
// //                         type="text"
// //                         value={componentLabel}
// //                         onChange={(e) => setComponentLabel(e.target.value)}
// //                     />
// //                 </div>
// //             )}

// //             <button onClick={handleAddComponent}>Add Component</button>

// //             {args.map((arg, index) => (
// //                 <div key={index}>
// //                     <input
// //                         type="text"
// //                         value={arg.name}
// //                         onChange={(e) => handleArgChange(index, 'name', e.target.value)}
// //                     />
// //                     <select
// //                         value={arg.value.toString()}
// //                         onChange={(e) =>
// //                             handleArgChange(index, 'value', e.target.value === 'true')
// //                         }
// //                     >
// //                         <option value="true">true</option>
// //                         <option value="false">false</option>
// //                     </select>
// //                     <button onClick={() => handleDeleteArg(index)}>X</button>
// //                 </div>
// //             ))}
// //             <button onClick={handleAddArgument}>Add Argument</button>
// //         </div>
// //     );
// // };

// // export default Demo;



// import React, { useState } from 'react';

// const Demo = () => {
//     const [selectedValue, setSelectedValue] = useState('');
//     const [dynamicOptions, setDynamicOptions] = useState([]);

//     const handleSelectChange = (e) => {
//         const selectedOption = e.target.value;
//         setSelectedValue(selectedOption);

//         // Generate new select options based on the selected value
//         if (selectedOption === 'option1') {
//             setDynamicOptions(['dynamicOption1', 'dynamicOption2', 'dynamicOption3']);
//         } else if (selectedOption === 'option2') {
//             setDynamicOptions(['dynamicOption4', 'dynamicOption5']);
//         } else {
//             setDynamicOptions([]);
//         }
//     };

//     return (
//         <div>
//             <select value={selectedValue} onChange={handleSelectChange}>
//                 <option value="">Select an option</option>
//                 <option value="option1">Option 1</option>
//                 <option value="option2">Option 2</option>
//                 <option value="option3">Option 3</option>
//             </select>

//             {selectedValue && (
//                 <div>
//                     <p>Selected value: {selectedValue}</p>

//                     <select>
//                         {dynamicOptions.map((option) => (
//                             <option key={option} value={option}>
//                                 {option}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Demo;


// const SearchBox = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [suggestions, setSuggestions] = useState([]);

//     const handleSearch = (event) => {
//         const value = event.target.value;
//         setSearchTerm(value);
//         // Perform search and update suggestions
//         // You can make an API call or use local data to fetch the suggestions
//         const newSuggestions = fetchSuggestions(value); // Replace with your logic
//         setSuggestions(newSuggestions);
//     };

//     const fetchSuggestions = (value) => {
//         // Perform your search logic here and return an array of suggestions
//         // For example, you can filter an array based on the search term
//         const filteredSuggestions = ['Apple', 'Apricot', 'Avocado', 'Banana', 'Blackberry', 'Blueberry', 'Cherry', 'Coconut', 'Cucumber', 'Durian', 'Fig', 'Grapefruit', 'Grapes', 'Kiwi', 'Lemon', 'Lime', 'Lychee', 'Mandarin', 'Mango', 'Melon', 'Nectarine', 'Orange', 'Papaya', 'Passion', 'Peach', 'Pear', 'Pineapple', 'Plum', 'Pomegranate', 'Pomelo', 'Raspberry', 'Strawberry', 'Watermelon'];

//         return filteredSuggestions;
//     };

//     return (
//         <Box>
//             <InputGroup>
//                 <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
//                 <Input
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={handleSearch}
//                 />
//             </InputGroup>
//             <VStack align="start" mt={2}>
//                 <List>
//                     {suggestions.map((suggestion) => (
//                         <ListItem key={suggestion}>
//                             <Text>{suggestion}</Text>
//                         </ListItem>
//                     ))}
//                 </List>
//             </VStack>
//         </Box>
//     );
// };

// export default SearchBox;


// import React, { useState, useEffect } from 'react';

// const Demo = () => {
//     const [isVisible, setIsVisible] = useState(true);
//     const [prevScrollPos, setPrevScrollPos] = useState(0);

//     useEffect(() => {
//         const handleScroll = () => {
//             const currentScrollPos = window.pageYOffset;
//             const isScrollingUp = prevScrollPos > currentScrollPos;

//             setIsVisible(isScrollingUp);
//             setPrevScrollPos(currentScrollPos);
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [prevScrollPos]);

//     return (
//         <div>
//             {isVisible && <div>Scroll Up to Hide Me</div>}
//             {!isVisible && <div>Scroll Down to Show Me</div>}
//         </div>
//     );
// };

// export default Demo;
