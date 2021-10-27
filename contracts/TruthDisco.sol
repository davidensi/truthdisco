// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
/* pragma experimental ABIEncoderV2; */
pragma abicoder v2;

//Internal modules
import './Modules/Reputations.sol';
import './Modules/Questions.sol';

//Token infrastructure
import "./Token/IERC20.sol";
import "./Token/extensions/IERC20Metadata.sol";
import "./Token/utils/Context.sol";


//Debug tools
import "hardhat/console.sol";


/** This contains the API methods that are accessible on the chain.
** permisions are managed in this contract, and the methods are delegated
** to the child-contracts **/
contract TruthDisco  is Context, IERC20, IERC20Metadata {


  address public _owner;

  //Reputation ledger
  Reputations _reputations;

  //Questions record
  Questions _questions;

  //Public key - of owner
  string public _publicKey;

  //Token info
  string private _name;
  string private _symbol;
  uint256 private _totalSupply;
  mapping(address => uint256) private _balances;
  mapping(address => mapping(address => uint256)) private _allowances;


  constructor(string memory publicKey, string memory name_, string memory symbol_) {
    _owner = msg.sender;
    _reputations = new Reputations();
    _questions = new Questions();
    /* _tokenAddr = tokenAddress; */
    _publicKey = publicKey;

    _name = name_;
    _symbol = symbol_;
  }

  function getQuestions() public view returns(Questions.Question[] memory) {
    return _questions.getQuestionList();
  }

  function initQuestion(string memory stimulus) public {
    require(msg.sender == _owner, "Only the administrator can create questions");

    console.log("_owner: %s", _owner);
    console.log("msg.sender: %s", msg.sender);

    console.log("initialising question with stimulus: %s", stimulus );
    _questions.initQuestion(stimulus);
  }

  function submitAnswer(uint qId, string memory sub) public {

    uint256 rep = _reputations.reputationOf(msg.sender);
    _questions.submitAnswer(qId, msg.sender, rep, sub);

    console.log("User: %s, QuestionID: %s, Submission: %s", msg.sender, qId, sub);

  }

  function getQuestionSubmissions(uint qId) public view returns (Questions.Answer[] memory) {
    require(msg.sender == _owner, "Only the administrator can request submissions");

    console.log("check answers for question: %s", qId);
    return _questions.scanSubmissions(qId);
  }

  function processQuestion(uint qId, address[] memory users,
      uint[] memory reputations, uint[] memory rewards, string memory answer) public {
    require(msg.sender == _owner, "Only the administrator can allocate rewards");

    console.log("processing Question %s", qId);
    console.log("Final answer is: %s", answer);
    for(uint i = 0; i < users.length; i++) {
      console.log("User: %s", users[i]);
      _mint(users[i], rewards[i]);
      _reputations.updateReputation(users[i], reputations[i]);
      /* console.log("gets reward of: %s", rewards[i]); */ 
      console.log("And their reputation is now: %s", reputations[i]);

    }


    _questions.closeQuestion(qId, answer);
  }


  /* Token functions */
  /**
   * @dev Returns the name of the token.
   */
  function name() public view virtual override returns (string memory) {
      return _name;
  }

  /**
   * @dev Returns the symbol of the token, usually a shorter version of the
   * name.
   */
  function symbol() public view virtual override returns (string memory) {
      return _symbol;
  }

  /**
   * @dev Returns the number of decimals used to get its user representation.
   * For example, if `decimals` equals `2`, a balance of `505` tokens should
   * be displayed to a user as `5.05` (`505 / 10 ** 2`).
   *
   * Tokens usually opt for a value of 18, imitating the relationship between
   * Ether and Wei. This is the value {ERC20} uses, unless this function is
   * overridden;
   *
   * NOTE: This information is only used for _display_ purposes: it in
   * no way affects any of the arithmetic of the contract, including
   * {IERC20-balanceOf} and {IERC20-transfer}.
   */
  function decimals() public view virtual override returns (uint8) {
      return 0;
  }

  /**
   * @dev See {IERC20-totalSupply}.
   */
  function totalSupply() public view virtual override returns (uint256) {
      return _totalSupply;
  }

  /**
   * @dev See {IERC20-balanceOf}.
   */
  function balanceOf(address account) public view virtual override returns (uint256) {
      return _balances[account];
  }

  /**
   * @dev See {IERC20-transfer}.
   *
   * Requirements:
   *
   * - `recipient` cannot be the zero address.
   * - the caller must have a balance of at least `amount`.
   */
  function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
      _transfer(_msgSender(), recipient, amount);
      return true;
  }

  /**
   * @dev See {IERC20-allowance}.
   */
  function allowance(address owner, address spender) public view virtual override returns (uint256) {
      return _allowances[owner][spender];
  }
  /**
   * @dev See {IERC20-approve}.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   */
  function approve(address spender, uint256 amount) public virtual override returns (bool) {
      _approve(_msgSender(), spender, amount);
      return true;
  }

  /**
   * @dev See {IERC20-transferFrom}.
   *
   * Emits an {Approval} event indicating the updated allowance. This is not
   * required by the EIP. See the note at the beginning of {ERC20}.
   *
   * Requirements:
   *
   * - `sender` and `recipient` cannot be the zero address.
   * - `sender` must have a balance of at least `amount`.
   * - the caller must have allowance for ``sender``'s tokens of at least
   * `amount`.
   */
  function transferFrom(
      address sender,
      address recipient,
      uint256 amount
  ) public virtual override returns (bool) {
      _transfer(sender, recipient, amount);

      uint256 currentAllowance = _allowances[sender][_msgSender()];
      require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
      unchecked {
          _approve(sender, _msgSender(), currentAllowance - amount);
      }

      return true;
  }

  /**
   * @dev Atomically increases the allowance granted to `spender` by the caller.
   *
   * This is an alternative to {approve} that can be used as a mitigation for
   * problems described in {IERC20-approve}.
   *
   * Emits an {Approval} event indicating the updated allowance.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   */
  function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
      _approve(_msgSender(), spender, _allowances[_msgSender()][spender] + addedValue);
      return true;
  }

  /**
   * @dev Atomically decreases the allowance granted to `spender` by the caller.
   *
   * This is an alternative to {approve} that can be used as a mitigation for
   * problems described in {IERC20-approve}.
   *
   * Emits an {Approval} event indicating the updated allowance.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   * - `spender` must have allowance for the caller of at least
   * `subtractedValue`.
   */
  function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
      uint256 currentAllowance = _allowances[_msgSender()][spender];
      require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
      unchecked {
          _approve(_msgSender(), spender, currentAllowance - subtractedValue);
      }

      return true;
  }

  /* function reward(address user, uint value) public {
    require(msg.sender == _manager, "Only the manager can allocate token rewards");
    _mint(user, value);
  } */

  /**
   * @dev Moves `amount` of tokens from `sender` to `recipient`.
   *
   * This internal function is equivalent to {transfer}, and can be used to
   * e.g. implement automatic token fees, slashing mechanisms, etc.
   *
   * Emits a {Transfer} event.
   *
   * Requirements:
   *
   * - `sender` cannot be the zero address.
   * - `recipient` cannot be the zero address.
   * - `sender` must have a balance of at least `amount`.
   */
  function _transfer(
      address sender,
      address recipient,
      uint256 amount
  ) internal virtual {
      require(sender != address(0), "ERC20: transfer from the zero address");
      require(recipient != address(0), "ERC20: transfer to the zero address");

      _beforeTokenTransfer(sender, recipient, amount);

      uint256 senderBalance = _balances[sender];
      require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
      unchecked {
          _balances[sender] = senderBalance - amount;
      }
      _balances[recipient] += amount;

      emit Transfer(sender, recipient, amount);

      _afterTokenTransfer(sender, recipient, amount);
  }



  /** @dev Creates `amount` tokens and assigns them to `account`, increasing
   * the total supply.
   *
   * Emits a {Transfer} event with `from` set to the zero address.
   *
   * Requirements:
   *
   * - `account` cannot be the zero address.
   */
  function _mint(address account, uint256 amount) internal virtual {
      require(account != address(0), "ERC20: mint to the zero address");

      _beforeTokenTransfer(address(0), account, amount);

      _totalSupply += amount;
      _balances[account] += amount;
      emit Transfer(address(0), account, amount);

      _afterTokenTransfer(address(0), account, amount);
  }

  /**
   * @dev Destroys `amount` tokens from `account`, reducing the
   * total supply.
   *
   * Emits a {Transfer} event with `to` set to the zero address.
   *
   * Requirements:
   *
   * - `account` cannot be the zero address.
   * - `account` must have at least `amount` tokens.
   */
  function _burn(address account, uint256 amount) internal virtual {
      require(account != address(0), "ERC20: burn from the zero address");

      _beforeTokenTransfer(account, address(0), amount);

      uint256 accountBalance = _balances[account];
      require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
      unchecked {
          _balances[account] = accountBalance - amount;
      }
      _totalSupply -= amount;

      emit Transfer(account, address(0), amount);

      _afterTokenTransfer(account, address(0), amount);
  }

  /**
   * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
   *
   * This internal function is equivalent to `approve`, and can be used to
   * e.g. set automatic allowances for certain subsystems, etc.
   *
   * Emits an {Approval} event.
   *
   * Requirements:
   *
   * - `owner` cannot be the zero address.
   * - `spender` cannot be the zero address.
   */
  function _approve(
      address owner,
      address spender,
      uint256 amount
  ) internal virtual {
      require(owner != address(0), "ERC20: approve from the zero address");
      require(spender != address(0), "ERC20: approve to the zero address");

      _allowances[owner][spender] = amount;
      emit Approval(owner, spender, amount);
  }

  /**
   * @dev Hook that is called before any transfer of tokens. This includes
   * minting and burning.
   *
   * Calling conditions:
   *
   * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
   * will be transferred to `to`.
   * - when `from` is zero, `amount` tokens will be minted for `to`.
   * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
   * - `from` and `to` are never both zero.
   *
   * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
   */
  function _beforeTokenTransfer(
      address from,
      address to,
      uint256 amount
  ) internal virtual {}

  /**
   * @dev Hook that is called after any transfer of tokens. This includes
   * minting and burning.
   *
   * Calling conditions:
   *
   * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
   * has been transferred to `to`.
   * - when `from` is zero, `amount` tokens have been minted for `to`.
   * - when `to` is zero, `amount` of ``from``'s tokens have been burned.
   * - `from` and `to` are never both zero.
   *
   * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
   */
  function _afterTokenTransfer(
      address from,
      address to,
      uint256 amount
  ) internal virtual {}
}
