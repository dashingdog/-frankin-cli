/*
 * @Description: 
 * @Date: 2022-08-19 11:52:22
 */
export async  function cli(args) {
    console.log(args);
    return;
    // 获取命令行配置
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  console.log(options);
  await createProject(options);
 }